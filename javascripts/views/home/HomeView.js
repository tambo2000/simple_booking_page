define([
  'jquery',
  'underscore',
  'backbone',
  'libs/datepicker/bootstrap-datepicker',
  'text!templates/home/homeTemplate.html',
  'views/bookingResults/BookingResultsView',
  'views/cart/CartView',
  '../../models/cart/CartModel'
], function($, _, Backbone, Datepicker, homeTemplate, BookingResultsView, CartView, CartModel){

  var HomeView = Backbone.View.extend({
    el: $("#page"),

    events: {
      "submit #dates-form": "updateBookingResults",
    },

    updateBookingResults: function(event) {
      event.preventDefault();
      var url = this.buildUrl();
      var cartModel = new CartModel({subtotal: 0, items: []});
      if (url) {
        var bookingResultsView = new BookingResultsView(url, cartModel);
        bookingResultsView.render();
        var cartView = new CartView({model: cartModel});
        cartView.render();
      } else {
        $("#cart").empty();
        $("#booking-results").empty();
        $("#booking-results").html("<div class='alert alert-danger'>Invalid input. Please check your dates.</div>");
      }
    },

    sanitizeDate: function(date) {
      var dateRegex = /^(19\d\d|20\d\d)[- \/.](0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])$/
      var match = dateRegex.exec(date);
      if (match) {
        return match[1] + "-" + match[2] + "-" + match[3];
      }
      return "";
    },

    validateDates: function(arrival, departure) {
      var today = new Date();
      var arrival_date = new Date(arrival);
      var departure_date = new Date(departure);
      return (((arrival_date - today) >= (-24*60*60*1000)) && (arrival_date < departure_date));
    },

    buildUrl: function() {
      var form = $('#dates-form');
      var action = form.attr('action');
      var startDate = $('#dp-start').val();
      startDate = this.sanitizeDate(startDate);
      var endDate = $('#dp-end').val();
      endDate = this.sanitizeDate(endDate);
      if ((startDate && endDate) && (this.validateDates(startDate, endDate))) {
        return action + '?json=true&arrival_date=' + startDate + '&departure_date=' + endDate;
      }
      return "";
    },

    addDatepicker: function(){
      // I did not write most of this datepicker code. Only modified it for this app.
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
      this.addDatepicker();
    }

  });

  return HomeView;
  
});