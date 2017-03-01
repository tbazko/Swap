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

var utils = require('./utils/utils');

function Form(className) {
  this.forms = document.getElementsByClassName(className);
  this.currentForm = null;
  this.minPasswordLength = 6;
  this.errorMessages = {
    invalidEmail: 'Invalid email format',
    invalidCharacters: 'Contains forbidden symbols',
    minPasswordLength: 'Password should contain at least 6 symbols'
  };
  this.errors = {};
  this.emailRegex = /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/i;
  this.urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
}

Form.prototype.init = function () {
  if (this.forms.length > 0) {
    this.bindEvents();
  }
};

Form.prototype.bindEvents = function () {
  document.addEventListener('blur', this.onBlur.bind(this), true);
  document.addEventListener('keyup', this.onKeyUp.bind(this), true);
  document.addEventListener('submit', this.onSubmit.bind(this), true);
};

Form.prototype.onBlur = function (e) {
  var target = e.target;
  this.setCurrentForm(target);
  this.validateInput(target);
};

Form.prototype.onKeyUp = function (e) {
  var target = e.target;
  if (target.hasAttribute('type') && target.getAttribute('type') === 'text' || utils.selectorMatches(target, 'textarea')) {
    this.setCurrentForm(target);
    this.validateInput(target);
  }
};

Form.prototype.onSubmit = function (e) {
  e.preventDefault();
  var target = e.target;
  this.setCurrentForm(target);
  if (this.isValidForm()) {
    this.submitForm();
  }
};

Form.prototype.setCurrentForm = function (target) {
  while (target != document) {
    if (target && utils.selectorMatches(target, '.js-form')) {
      this.currentForm = target;
    }
    target = target.parentNode;
  }
};

Form.prototype.validateInput = function (input) {
  if (input.value === '') return;
  var isEmailInput = input.hasAttribute('type') && input.getAttribute('type') === 'email';
  var isTextInput = input.hasAttribute('type') && input.getAttribute('type') === 'text' || utils.selectorMatches(input, 'textarea');
  var isPasswordInput = input.hasAttribute('type') && input.getAttribute('type') === 'password' && input.getAttribute('data-validate') === 'true';

  if (isEmailInput) {
    this.validateEmail(input);
  } else if (isTextInput) {
    this.validateForRestrictedCharacters(input);
    this.removeEmails(input);
    this.removeUrls(input);
  } else if (isPasswordInput) {
    this.validatePassword(input);
  }
};

Form.prototype.validateEmail = function (input) {
  if (!this.isEmail(input.value)) {
    utils.removeClass(input, 'is-valid');
    utils.addClass(input, 'is-invalid');
    this.showInputError(input, this.errorMessages.invalidEmail);
  } else {
    utils.addClass(input, 'is-valid');
    utils.removeClass(input, 'is-invalid');
    this.hideInputError(input);
  }
};

Form.prototype.validateForRestrictedCharacters = function (input) {
  if (input.getAttribute('data-custom-validation')) return;
  if (!this.isValidString(input.value)) {
    utils.removeClass(input, 'is-valid');
    utils.addClass(input, 'is-invalid');
    this.showInputError(input, this.errorMessages.invalidCharacters);
  } else {
    utils.addClass(input, 'is-valid');
    utils.removeClass(input, 'is-invalid');
    this.hideInputError(input);
  }
};

Form.prototype.isValidForm = function () {
  var invalidInputs = this.currentForm.querySelector('.is-invalid');
  return invalidInputs ? false : true;
};

Form.prototype.submitForm = function () {
  if (this.currentForm.getAttribute('data-ajax-submit')) return;
  this.currentForm.submit();
};

Form.prototype.removeEmails = function (input) {
  if (this.emailRegex.test(input.value)) {
    input.value = input.value.replace(this.emailRegex, '((Forbidden))');
  }
};

Form.prototype.removeUrls = function (input) {
  if (this.urlRegex.test(input.value)) {
    input.value = input.value.replace(this.urlRegex, '((Forbidden))');
  }
};

Form.prototype.validatePassword = function (input) {
  if (input.value.length < 6) {
    utils.removeClass(input, 'is-valid');
    utils.addClass(input, 'is-invalid');
    this.showInputError(input, this.errorMessages.minPasswordLength);
  } else {
    utils.addClass(input, 'is-valid');
    utils.removeClass(input, 'is-invalid');
    this.hideInputError(input);
  }
};

Form.prototype.isValidString = function (str) {
  var regex = /^[а-яА-ЯЁёІіЇїҐґЄєЩщa-zA-Z0-9.,!"'_\-()@?#:$;\s\u00A0\u000D\u000A\000C]+$/gm;
  return regex.test(str);
};

Form.prototype.showInputError = function (input, error) {
  if (input.nextElementSibling) {
    var next = input.nextElementSibling;
    if (utils.selectorMatches(next, '.inputError')) return;
  }

  var errorDiv = document.createElement('div');
  errorDiv.innerText = error;
  utils.addClass(errorDiv, 'inputError');
  utils.insertAfter(errorDiv, input);
};

Form.prototype.hideInputError = function (input) {
  var next, parent;
  if (input.nextElementSibling) {
    next = input.nextElementSibling;
    parent = next.parentNode;
  } else {
    return;
  }

  if (utils.selectorMatches(next, '.inputError')) {
    parent.removeChild(next);
  }
};

Form.prototype.isEmail = function (email) {
  var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
  return regex.test(email);
};

module.exports = Form;

},{"./utils/utils":5}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
'use strict';

function PlacesAutoComplete(inputId) {
  this.input = document.getElementById(inputId);
  this.options = {};
  this.addressForm = {
    street_number: 'short_name',
    route: 'long_name',
    locality: 'long_name',
    administrative_area_level_1: 'short_name',
    country: 'long_name',
    postal_code: 'short_name'
  };
}

PlacesAutoComplete.prototype.init = function () {
  this.autocomplete = new google.maps.places.Autocomplete(this.input, this.options);
  this.bindEvents();
};

PlacesAutoComplete.prototype.bindEvents = function () {
  this.autocomplete.addListener('place_changed', this.onPlaceChanged.bind(this));
};

PlacesAutoComplete.prototype.onPlaceChanged = function () {
  this.fillInAddress();
};

PlacesAutoComplete.prototype.fillInAddress = function () {
  var place = this.autocomplete.getPlace();

  for (var component in this.addressForm) {
    if (document.getElementById(component)) {
      document.getElementById(component).value = '';
      document.getElementById(component).disabled = false;
    }
  }

  var addressComponents = place.address_components;
  var components = {};
  for (var i = 0, l = addressComponents.length; i < l; i++) {
    var addressType = addressComponents[i].types[0];
    if (this.addressForm[addressType]) {
      var val = addressComponents[i][this.addressForm[addressType]];
      if (document.getElementById(addressType)) {
        document.getElementById(addressType).value = val;
        components[addressType] = val;
      }
    }
  }
};

module.exports = PlacesAutoComplete;

},{}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
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

},{"../components/Counter":1,"../components/Menu":3,"../components/utils/utils":5}],7:[function(require,module,exports){
'use strict';

var FormValidator = require('../components/FormValidator');
var PlacesAutoComplete = require('../components/PlacesAutoComplete');

var p = new PlacesAutoComplete('autocomplete');
p.options = {
  types: ['(cities)'],
  componentRestrictions: { country: 'nl' }
};
p.init();
var form = new FormValidator('js-form');
form.init();

},{"../components/FormValidator":2,"../components/PlacesAutoComplete":4}]},{},[6,7]);
