define([
  'jquery',
  'underscore',
  'backbone',
  'libs/datepicker/bootstrap-datepicker',
  'text!templates/home/homeTemplate.html',
  'views/bookingResults/BookingResultsView',
  'views/cart/CartView'
], function($, _, Backbone, Datepicker, homeTemplate, BookingResultsView, CartView){

  var HomeView = Backbone.View.extend({
    el: $("#page"),

    events: {
      "submit #dates-form": "updateBookingResults"
    },

    updateBookingResults: function(event) {
      event.preventDefault();
      url = this.buildUrl();
      var bookingResultsView = new BookingResultsView(url);
      bookingResultsView.render();
      var cartView = new CartView();
      cartView.render();
    },

    buildUrl: function() {
      form = $('#dates-form');
      action = form.attr('action');
      startDate = $('#dp-start').val();
      endDate = $('#dp-end').val();
      return action + '?json=true&arrival_date=' + startDate + '&departure_date=' + endDate;
    },

    add_datepicker: function(){
      var nowTemp = new Date();
      var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
       
      var checkin = $('#dp-start').datepicker({
        onRender: function(date) {
          return date.valueOf() < now.valueOf() ? 'disabled' : '';
        },
        format: 'yyyy-mm-dd'
      }).on('changeDate', function(ev) {
        if (ev.date.valueOf() >= checkout.date.valueOf()) {
          var newDate = new Date(ev.date)
          newDate.setDate(newDate.getDate() + 1);
          checkout.setValue(newDate);
        } else {
          checkout.setValue(checkout.date); // trigger rerender of valid dates
        }
        checkin.hide();
        $('#dp-end')[0].focus();
      }).data('datepicker');

      var checkout = $('#dp-end').datepicker({
        onRender: function(date) {
          return date.valueOf() <= checkin.date.valueOf() ? 'disabled' : '';
        },
        format: 'yyyy-mm-dd'
      }).on('changeDate', function(ev) {
        checkout.hide();
      }).data('datepicker');
    },

    render: function(){
      
      this.$el.html(homeTemplate);
      // this.add_datepicker();

      // var sidebarView = new SidebarView();
      // sidebarView.render();
 
    }

  });

  return HomeView;
  
});