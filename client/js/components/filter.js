var $ = require('jquery');
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
    this.$filter.toggleClass('is-active', !this.$filter.hasClass('is-active'));
    this.$filterTrigger.toggleClass('is-active', !this.$filterTrigger.hasClass('is-active'));
  }
}

Filter.initialize();
module.exports = Filter;
