// Filename: app.js
define([
  'jquery', 
  'underscore', 
  'backbone',
  'router', // Request router.js
], function($, _, Backbone, Router){
  var initialize = function(){
    $(window).on('resize', function(){ setCSS(); });
    setCSS();

    // Pass in our Router module and call it's initialize function
    Router.initialize();
  };

  var setCSS = function() {
    $("#booking-results").css("height", bookingResultHeight());
  };

  var bookingResultHeight = function() { return ($(window).height()-200) + "px" };

  return { 
    initialize: initialize
  };
});