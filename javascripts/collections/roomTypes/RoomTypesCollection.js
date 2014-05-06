define([
  'underscore',
  'backbone'
  // 'models/roomType/RoomTypeModel'
], function(_, Backbone){

  var RoomTypesCollection = Backbone.Collection.extend({
      // initialize: function (options) {
      //   this.on("error", this.error, this)
      //   this.fetch();
      // },
      
      // model: RoomTypeModel,

      // initialize : function(models, options) {},
      
      // url : function() {
      //   return 'https://api.github.com/repos/thomasdavis/backbonetutorials/contributors';
      // },

      url: 'https://reservations.frontdeskanywhere.net/F120322D/oboe2/ajax_get_booking_list.php?json=true&arrival_date=2014-05-07&departure_date=2014-05-09&callback=?',

      parse: function(response) {
        console.log(reponse);
        return response;
      }//,

      // error: function (model, response, options) {
      //   console.log(model);
      //   console.log(response);
      //   console.log(options);
      // }
      // url: 'http://backbonejs-beginner.herokuapp.com/users'
    
      // parse : function(data) {
      //     var uniqueArray = this.removeDuplicates(data.data);
      //     return uniqueArray;
      // }  
     
  });

  return RoomTypesCollection;

});