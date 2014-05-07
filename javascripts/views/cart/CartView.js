define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/cart/cartTemplate.html'
], function($, _, Backbone, cartTemplate){

  var CartView = Backbone.View.extend({
    el: $("#cart"),

    render: function(){
      var renderedTemplate = _.template( cartTemplate, { cart: this.model } );
      this.$el.html(renderedTemplate);
      
    }

  });

  return CartView;
  
});