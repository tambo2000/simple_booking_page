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
      this.roomTypes.each(function(roomType) {
        var renderedTemplate = _.template( bookingResultsTemplate, {roomType: roomType} );
        that.$el.append(renderedTemplate);
        console.log(roomType.get('availableRates'));
        console.log(roomType.get('roomType'));
        var ratesView = new RatesView(roomType.get('availableRates'), roomType.get('roomType'));
        ratesView.render();
      });
    },

    addToCart: function(event) {
      event.preventDefault();
      var subtotal = this.cart.get('subtotal');
      var price = $(event.currentTarget).children('.price').val();
      var quantity = $(event.currentTarget).children('.quantity').val();
      this.cart.set({subtotal: subtotal + (price * quantity)});
      var cartView = new CartView({model: this.cart});
      cartView.render();
    },

    get_json: function() {
      // this function is necessary because the JSON returned from the API endpoint is invalid. 
      // It has a <br/> at the beginning.
      var contents = $.ajax({type: "GET", 
                             url: "php/get_url_contents.php", 
                             async: false, 
                             data: {'url': this.url}
                     }).responseText;
      contents = contents.replace("<br/>", "");
      return $.parseJSON(contents);
    },

    get_mock_json: function() {
      var contents = '[{"title":"1 queen size bed","roomType":1,"checkInDate":"2014-05-16","checkOutDate":"2014-05-19","availableRates":[{"price":100,"rateNumber":201,"rateName":"Really long rate name","availabile":8},{"price":102,"rateNumber":202,"rateName":"BBB","availabile":9},{"price":103,"rateNumber":203,"rateName":"CCC","availabile":1},{"price":200,"rateNumber":204,"rateName":"DDD","availabile":8},{"price":50,"rateNumber":205,"rateName":"EEE","availabile":1}]},{"title":"2 Queen Size","roomType":2,"checkInDate":"2014-05-16","checkOutDate":"2014-05-19","availableRates":[{"price":110,"rateNumber":201,"rateName":"Senior Discount","availabile":13}]},{"title":"King size","roomType":3,"checkInDate":"2014-05-16","checkOutDate":"2014-05-19","availableRates":[{"price":100,"rateNumber":201,"rateName":"Memorial Day Discount","availabile":5}]}]'
      return $.parseJSON(contents);
    }

  });

  return BookingResultsView;
  
});