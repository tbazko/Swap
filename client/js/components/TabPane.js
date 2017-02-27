var utils = require('./utils/utils');

function TabPane(tabIdName) {
  this.tabPane = document.getElementById(tabIdName);
  this.tabs = document.getElementsByClassName('js-tab');
  this.panes = document.getElementsByClassName('js-pane');
}

TabPane.prototype.init = function() {
  this.bindEvents();
}

TabPane.prototype.bindEvents = function() {
  this.tabPane.addEventListener('click', this.onClickHandler.bind(this));
}

TabPane.prototype.onClickHandler = function(e) {
  var target = e.target;

  while(target != this.tabPane) {
    if (target && utils.selectorMatches(target, '.js-tab')) {
      return this.tabOnClick(target);
    }
    target = target.parentNode;
  }
}

TabPane.prototype.tabOnClick = function(currentTab) {
  var arr = [].slice.call(this.tabs);
  var i = arr.indexOf(currentTab);
  var currentPane = this.panes[i];
  this.deactivateAll(this.tabs, currentTab);
  this.deactivateAll(this.panes, currentPane);
  utils.addClass(currentTab, 'is-active');
  utils.addClass(currentPane, 'is-active');
}

TabPane.prototype.deactivateAll = function(array) {
  for(var i = 0; i < array.length; i++) {
    utils.removeClass(array[i], 'is-active');
  }
}

module.exports = TabPane;