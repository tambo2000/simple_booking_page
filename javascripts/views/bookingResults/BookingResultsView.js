define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/bookingResults/bookingResultsTemplate.html',
  'collections/roomTypes/RoomTypesCollection'
], function($, _, Backbone, bookingResultsTemplate, RoomTypesCollection){

  var BookingResultsView = Backbone.View.extend({
    el: $("#booking-results"),

    initialize: function(url) {
      this.url = url;
    },

    render: function(){
      var that = this;
      // var rooms_json = this.get_json();
      var rooms_json = this.get_mock_json();
      var roomTypes = new RoomTypesCollection(rooms_json);
      var renderedTemplate = _.template( bookingResultsTemplate, {roomTypes: roomTypes.models} );
      this.$el.html(renderedTemplate);
      // roomTypes.fetch({
      //   dataType: 'jsonp',
      //   success: function(roomTypes) {
      //     console.log("in success");
      //     var renderedTemplate = _.template(bookingResultsTemplate, {roomTypes: roomTypes.models});
      //     that.$el.html(bookingResultsTemplate);
      //   },
      //   error: function (collection, resp){
      //     console.log("error retrieving model");
      //   }
      // })
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