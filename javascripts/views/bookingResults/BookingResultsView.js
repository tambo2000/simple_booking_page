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
      console.log(this.url);
    },

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
      // this function is necessary because the JSON returned from the API endpoint is invalid. 
      // It has a <br/> at the beginning.
      var contents = $.ajax({type: "GET", 
                             url: "php/get_url_contents.php", 
                             async: false, 
                             data: {'url': this.url}
                     }).responseText;
      contents = contents.replace("<br/>", "");
      return $.parseJSON(contents);
    }

  });

  return BookingResultsView;
  
});