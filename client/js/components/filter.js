var $ = require('jquery');
var utils = require('./utils/utils');
var Filter = {
  $filter: undefined,
  $filterTrigger: undefined,

  bindEvents: function() {
    this.$filterTrigger.on('click', this.onFilterTriggerClick.bind(this));
  },

  initialize: function() {
    this.$filter = $('.js-filter');
    this.$filterTrigger = $('.js-filter-trigger');

    this.bindEvents();
  },

  onFilterTriggerClick: function(e) {
    e.preventDefault();
    utils.activate(this.$filter);
    utils.activate(this.$filterTrigger);
  }
}

Filter.initialize();
module.exports = Filter;
