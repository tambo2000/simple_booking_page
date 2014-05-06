define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/bookingResults/bookingResultsTemplate.html',
  'collections/roomTypes/RoomTypesCollection'
], function($, _, Backbone, bookingResultsTemplate, RoomTypesCollection){

  var BookingResultsView = Backbone.View.extend({
    el: $("#booking-results"),

    render: function(){
      var that = this;
      var rooms_json = this.get_json();
      var roomTypes = new RoomTypesCollection(rooms_json);
      console.log(bookingResultsTemplate);
      console.log(roomTypes);
      console.log(roomTypes.models);
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
      console.log("getting url contents");
      var msg = $.ajax({type: "GET", url: "php/get_url_contents.php", async: false}).responseText;
      msg = msg.replace("<br/>", "");
      console.log(msg);
      msg = $.parseJSON(msg);
      console.log(msg);
      return msg
    }

  });

  return BookingResultsView;
  
});