define([
  'underscore',
  'backbone'
], function(_, Backbone){

  var RoomTypesCollection = Backbone.Collection.extend({
    comparator: function(roomType) {
      return roomType.get("title");
    }
  });

  return RoomTypesCollection;

});