define([
  'jquery',
  'underscore',
  'backbone',
  'libs/datepicker/bootstrap-datepicker',
  'text!templates/home/HomeTemplate.html',
  'views/bookingResults/BookingResultsView'
], function($, _, Backbone, Datepicker, homeTemplate, BookingResultsView){

  var HomeView = Backbone.View.extend({
    el: $("#page"),

    add_datepicker: function(){
      var nowTemp = new Date();
      var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
       
      var checkin = $('#dp-start').datepicker({
        onRender: function(date) {
          return date.valueOf() < now.valueOf() ? 'disabled' : '';
        },
        format: 'yyyy-mm-dd'
      }).on('changeDate', function(ev) {
        if (ev.date.valueOf() > checkout.date.valueOf()) {
          var newDate = new Date(ev.date)
          newDate.setDate(newDate.getDate() + 1);
          checkout.setValue(newDate);
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
      this.add_datepicker();

      var bookingResultsView = new BookingResultsView();
      bookingResultsView.render();

      // var sidebarView = new SidebarView();
      // sidebarView.render();
 
    }

  });

  return HomeView;
  
});