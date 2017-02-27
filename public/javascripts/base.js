(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function Counter() {
  this.id = 'requestCounter';
  this.count = 0;
}

Counter.prototype.update = function () {
  var counter = document.getElementById(this.id);
  counter.innerHTML = ++this.count;
};

module.exports = Counter;

},{}],2:[function(require,module,exports){
'use strict';

function Menu(menuClass, triggerClass, options) {
	this.menu = document.getElementsByClassName(menuClass)[0];
	this.trigger = document.getElementsByClassName(triggerClass)[0];
	this.container = document.getElementById('main');
	this.navigation = document.getElementById('navigation');
	this.navigationHeight = this.navigation.offsetHeight;

	this.lastKnownScrollPosition = 0;
	this.ticking = false;
}

Menu.prototype.init = function () {
	this.bindEvents();
};

Menu.prototype.bindEvents = function () {
	this.trigger.addEventListener('click', this.toggleMenu.bind(this), false);
	window.addEventListener('scroll', this.onScrollThrottle.bind(this), false);
	window.addEventListener('optimizedResize', this.setNavigationHeight.bind(this), false);
};

Menu.prototype.onScrollThrottle = function () {
	this.lastKnownScrollPosition = window.scrollY;
	if (!this.ticking) {
		window.requestAnimationFrame(function () {
			this.getSticky(this.lastKnownScrollPosition);
			this.ticking = false;
		}.bind(this));
	}
	this.ticking = true;
};

Menu.prototype.setNavigationHeight = function () {
	this.navigation.style.height = '';
	this.navigationHeight = this.navigation.offsetHeight;
	if (this.lastKnownScrollPosition) {
		this.getSticky(this.lastKnownScrollPosition);
	}
};

Menu.prototype.toggleMenu = function () {
	this.menu.classList.toggle('is-active');
	this.trigger.classList.toggle('is-active');
	this.container.classList.toggle('is-active-menu');
};

Menu.prototype.getSticky = function () {
	var max = 40;
	var newHeight = this.lastKnownScrollPosition < this.navigationHeight - max ? this.navigationHeight - this.lastKnownScrollPosition : max;
	this.navigation.style.height = newHeight + 'px';

	if (this.lastKnownScrollPosition > (this.navigationHeight - max) / 2) {
		this.navigation.classList.add('is-sticky');
	} else {
		this.navigation.classList.remove('is-sticky');
	}
};

module.exports = Menu;

},{}],3:[function(require,module,exports){
'use strict';

var cookies;

module.exports = {
  closest: function closest(el, selector) {
    var closest;
    while (el) {
      closest = el;
      if (closest && this.selectorMatches(closest, selector)) {
        return closest;
      }
      el = closest.parentElement;
    }

    return null;
  },

  readCookie: function readCookie(name) {
    if (cookies) {
      return cookies[name];
    }

    var c = document.cookie.split('; ');
    cookies = {};

    for (var i = c.length - 1; i >= 0; i--) {
      var C = c[i].split('=');
      cookies[C[0]] = C[1];
    }

    return cookies[name];
  },

  selectorMatches: function selectorMatches(el, selector) {
    var p = Element.prototype;
    var f = p.matches || p.webkitMatchesSelector || p.mozMatchesSelector || p.msMatchesSelector || function (s) {
      return [].indexOf.call(document.querySelectorAll(s), this) !== -1;
    };
    return f.call(el, selector);
  },

  addClass: function addClass(element, className) {
    if (this.selectorMatches(element, '.' + className)) return;

    if (element.className != '') {
      element.className += ' ' + className;
    } else {
      element.className = className;
    }
  },

  removeClass: function removeClass(element, className) {
    var regex = new RegExp('(?:^|\\s)' + className + '(?!\\S)', 'gi');
    element.className = element.className.replace(regex, '');
  },

  insertAfter: function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
  },

  trim: function trim(str, chars) {
    if (!str) return str;
    return this.rtrim(this.ltrim(str, chars), chars);
  },

  ltrim: function ltrim(str, chars) {
    if (!str) return str;
    var pattern = chars ? new RegExp('^[' + chars + ']+', 'g') : /^\s+/g;
    return str.replace(pattern, '');
  },

  rtrim: function rtrim(str, chars) {
    if (!str) return str;
    var pattern = chars ? new RegExp('[' + chars + ']') : /\s/;

    var idx = str.length - 1;
    while (idx >= 0 && pattern.test(str[idx])) {
      idx--;
    }

    return idx < str.length ? str.substr(0, idx + 1) : str;
  }
};

},{}],4:[function(require,module,exports){
'use strict';

var readCookie = require('../components/utils/utils').readCookie;
var Menu = require('../components/Menu');
var Counter = require('../components/Counter');

if (readCookie('logged')) {
  var userId = readCookie('logged');
  window.socket = io();
  var socket = window.socket;
  var counter;

  socket.on('newSwapRequest', function (data) {
    if (!counter) {
      counter = new Counter();
    }
    counter.update();
  });

  socket.emit('joinRoom', userId);
}

var menu = new Menu('js-menu-wrapper', 'js-menu-trigger');
menu.init();

},{"../components/Counter":1,"../components/Menu":2,"../components/utils/utils":3}]},{},[4]);
