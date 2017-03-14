var utils = require('./utils/utils');
var Handlebars = require('handlebars');
var helpers = require('./utils/template-helpers');

function TabPane(tabIdName, options) {
  this.tabPane = document.getElementById(tabIdName);
  this.tabs = document.getElementsByClassName('js-tab');
  this.panes = document.getElementsByClassName('js-pane');
  if(options) {
    this.ajax = options.ajax;
  }
}

TabPane.prototype.init = function () {
  if(this.tabPane) {
    this.bindEvents();
  }
}

TabPane.prototype.bindEvents = function () {
  this.tabPane.addEventListener('click', this.onClickHandler.bind(this));
}

TabPane.prototype.onClickHandler = function (e) {
  var target = e.target;

  while (target != this.tabPane) {
    if (target && utils.selectorMatches(target, '.js-tab')) {
      this.currentTab = target;
      return this.tabOnClick();
    }
    target = target.parentNode;
  }
}

TabPane.prototype.tabOnClick = function () {
  var arr = [].slice.call(this.tabs);
  var i = arr.indexOf(this.currentTab);
  this.currentPane = this.panes[i];
  if (this.ajax && this.currentPane.children.length === 0) {
    this.requestDataFromServer();
  }
  this.deactivateAll(this.tabs, this.currentTab);
  this.deactivateAll(this.panes, this.currentPane);
  utils.addClass(this.currentTab, 'is-active');
  utils.addClass(this.currentPane, 'is-active');
}

TabPane.prototype.requestDataFromServer = function () {
  var xhr = new XMLHttpRequest();
  var url = this.currentTab.getAttribute('data-href');
  console.log(url);
  xhr.open('GET', url);
  xhr.onload = () => {
    if (xhr.status === 200) {
      var response = JSON.parse(xhr.response);
      response.currentPane = this.currentPane;
      var event = new CustomEvent('switchedTab', {'detail': response});
      document.dispatchEvent(event);
    }
    else {
      console.log('Request failed.  Returned status of ' + xhr.status);
    }
  };
  xhr.send();
}

TabPane.prototype.deactivateAll = function (array) {
  for (var i = 0; i < array.length; i++) {
    utils.removeClass(array[i], 'is-active');
  }
}

module.exports = TabPane;