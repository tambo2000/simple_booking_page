define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/rates/rateTemplate.html'
], function($, _, Backbone, rateTemplate){

  var RatesView = Backbone.View.extend({

    initialize: function(rates, roomtype) {
      this.rates = rates;
      this.roomtype = roomtype;
    },

    render: function(){
      var that = this;
      console.log(this.rates);
      _.each(this.rates, function(rate, index) {
        var selector = ".rates#" + that.roomtype;
        console.log(selector);
        var renderedTemplate = _.template( rateTemplate, { rate: rate } );
        $(selector).append(renderedTemplate);
        if (index % 4 === 3) {
          $(selector).append("<div class='col-md-12'><hr></div>");
        }
      });
      
    }

  });

  return RatesView;
  
});