define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/bookingResults/bookingResultsTemplate.html',
  'collections/roomTypes/RoomTypesCollection',
  '../cart/CartView',
  '../rates/RatesView'
], function($, _, Backbone, bookingResultsTemplate, RoomTypesCollection, CartView, RatesView){

  var BookingResultsView = Backbone.View.extend({
    el: $("#booking-results"),

    initialize: function(url, cart) {
      this.url = url;
      this.cart = cart;
      var rooms_json = this.get_mock_json();
      // var rooms_json = this.get_json();
      this.roomTypes = new RoomTypesCollection(rooms_json);
    },

    events: {
      "submit .add-room-form": "addToCart"
    },

    render: function(){
      var that = this;
      this.$el.empty();
      this.roomTypes.each(function(roomType) {
        var renderedTemplate = _.template( bookingResultsTemplate, {roomType: roomType} );
        that.$el.append(renderedTemplate);
        var ratesView = new RatesView(roomType.get('availableRates'), roomType.get('roomType'));
        ratesView.render();
      });
      this.$el.wrapInner("<div class='scroll-window'></div>");
    },

    addToCart: function(event) {
      event.preventDefault();
      var form = $(event.currentTarget)
      this.modifyCart(form);
      this.modifyRate(form);
    },

    modifyCart: function(form) {
      var days = this.get_number_of_nights();
      var subtotal = this.cart.get('subtotal');
      var price = form.children('.price').val();
      var quantity = form.children('.quantity').val();
      var item_subtotal = days * price * quantity;
      this.cart.set({subtotal: subtotal + item_subtotal});
      var rateName = form.children('.name').val();
      var items = this.cart.get('items');
      if (quantity > 0) {
        items.push( quantity + " x " + rateName + " x " + days + " nights = $" + item_subtotal );
      }
      var cartView = new CartView({model: this.cart});
      cartView.render();
    },

    modifyRate: function(form) {
      var roomType = form.children('.roomType').val();
      var room = _.find(this.roomTypes.models, function(model) { return model.get('roomType') == roomType; });
      var rateNumber = form.attr('id');
      var rate = _.find(room.get('availableRates'), function(model) { return model.rateNumber == rateNumber; });
      var availability = rate.availabile;
      var quantity = form.children('.quantity').val();
      rate.availabile = availability - quantity;
      this.render();
    },

    get_number_of_nights: function() {
      var checkInDate = new Date(this.roomTypes.models[0].get('checkInDate'));
      var checkOutDate = new Date(this.roomTypes.models[0].get('checkOutDate'));

      return (checkOutDate - checkInDate)/24/60/60/1000;
    },

    get_json: function() {
      // this function is necessary because the JSON returned from the API endpoint is invalid. 
      // It has a <br/> at the beginning which we remove in this function.
      // This is a hack which uses a PHP script to echo the contents of the response on our server, 
      // thus eliminating the CORS error and allows us to obtain the response text.
      var contents = $.ajax({type: "GET", 
                             url: "php/get_url_contents.php", 
                             async: false, 
                             data: {'url': this.url}
                     }).responseText;
      contents = contents.replace("<br/>", "");
      return $.parseJSON(contents);
    },

    get_mock_json: function() {
      var that = this;
      var contents = '[{"title":"1 queen size bed","roomType":1,"checkInDate":"2014-05-16","checkOutDate":"2014-05-19","availableRates":[{"price":100,"rateNumber":201,"rateName":"Really long rate name","availabile":8},{"price":102,"rateNumber":202,"rateName":"BBB","availabile":9},{"price":103,"rateNumber":203,"rateName":"CCC","availabile":1},{"price":200,"rateNumber":204,"rateName":"DDD","availabile":8},{"price":50,"rateNumber":205,"rateName":"EEE","availabile":1}]},{"title":"2 Queen Size","roomType":2,"checkInDate":"2014-05-16","checkOutDate":"2014-05-19","availableRates":[{"price":110,"rateNumber":201,"rateName":"Senior Discount","availabile":13}]},{"title":"King size","roomType":3,"checkInDate":"2014-05-16","checkOutDate":"2014-05-19","availableRates":[{"price":100,"rateNumber":201,"rateName":"Memorial Day Discount","availabile":5}]}]'
      var contentsJSON = $.parseJSON(contents);
      contentsJSON.forEach(function(roomType) {
        // debugger
        roomType.checkInDate = that.getParameterByName('arrival_date');
        roomType.checkOutDate = that.getParameterByName('departure_date');
      });
      return contentsJSON;
    },

    getParameterByName: function(name) {
      var match = RegExp('[?&]' + name + '=([^&]*)').exec(this.url);
      return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
    }

  });

  return BookingResultsView;
  
});