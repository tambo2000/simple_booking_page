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
      this.get_json();
      var roomTypes = new RoomTypesCollection();
      roomTypes.fetch({
        // dataType: 'jsonp',
        // jsonp: 'jsonp',
        success: function(roomTypes) {
          console.log("in success");
          console.log(roomTypes);
          var renderedTemplate = _.template(bookingResultsTemplate, {roomTypes: roomTypes.models})
          that.$el.html(bookingResultsTemplate);
        },
        error: function (collection, resp){
          console.log("starting fetch error")
          console.log(collection);
          console.log(resp);
          console.log('error arguments: ', arguments);
          console.log("error retrieving model");
        }
      })
    },

    get_json: function() {
      $.ajax({
        url:"https://reservations.frontdeskanywhere.net/F120322D/oboe2/ajax_get_booking_list.php?json=true&arrival_date=2014-05-07&departure_date=2014-05-09",
        dataType: 'JSONP',
        complete: function(xhr){
          console.log(xhr);
          var raw= xhr.responseText
            , json
            , err
            ;

          while(raw.length && err)
          {
            // rewind state
            err= false;
            try {
              //parse JSON
              json= parseJSON(raw);
            }
            catch (e)
            {
              // Mark loop as invalid
              err= true;
            }

            // Get out if json is valid and parsed
            if (!err) break;

            // If loop is not broken try another one time: cut one char from invalid json and go on.
            raw= raw.substr(1);
          }

          if (!err)
          {
            console.log('YAPPPEEEEE :)');
          }
          else
          {
            console.log('NOPE :(');
          }
        }
      })
    }

  });

  return BookingResultsView;
  
});