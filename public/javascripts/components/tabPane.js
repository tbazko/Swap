define(function (require) {
  var $ = require('jquery'),
      utils = require('components/utils/utils');

  var tabPane = {
    tab: undefined,
    pane: undefined,

    initialize: function() {
      this.tab = $('.js-tab');
      this.pane = $('.js-pane');
      this.bindEvents();
    },

    bindEvents: function() {
      this.tab.on('click', this.tabOnClick.bind(this));
    },

    tabOnClick: function(event) {
      var $curTab = $(event.target).closest('.js-tab');
      var num = $curTab.index();
      var $curPane = this.pane.eq(num);
      $curTab.siblings().removeClass('is-active');
      $curPane.siblings().removeClass('is-active');
      utils.activate($curTab);
      utils.activate($curPane);
    }
  };

  tabPane.initialize();
});