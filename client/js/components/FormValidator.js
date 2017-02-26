var utils = require('./utils/utils');

function Form(className) {
  this.forms = document.getElementsByClassName(className);
  this.currentForm = null;
  this.minPasswordLength = 6;
  this.errorMessages = {
    invalidEmail: 'Invalid email format',
    invalidCharacters: 'Contains forbidden symbols',
    minPasswordLength: 'Password should contain at least 6 symbols'
  }
  this.errors = {};
  this.emailRegex = /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/i;
  this.urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
}

Form.prototype.init = function () {
  if(this.forms.length > 0) {
    this.bindEvents();
  }
};

Form.prototype.bindEvents = function () {
  document.addEventListener('blur', this.onBlur.bind(this), true);
  document.addEventListener('keyup', this.onKeyUp.bind(this), true);
  document.addEventListener('submit', this.onSubmit.bind(this), true);
};

Form.prototype.onBlur = function(e) {
  var target = e.target;
  this.setCurrentForm(target);
  this.validateInput(target);
}

Form.prototype.onKeyUp = function (e) {
  var target = e.target;
  if(target.hasAttribute('type') && target.getAttribute('type') === 'text' || utils.selectorMatches(target, 'textarea')) {
    this.setCurrentForm(target);
    this.validateInput(target);
  }
};

Form.prototype.onSubmit = function(e) {
  e.preventDefault();
  var target = e.target;
  this.setCurrentForm(target);
  if(this.isValidForm()) {
    this.submitForm();
  }
}

Form.prototype.setCurrentForm = function (target) {
  while(target != document) {
    if (target && utils.selectorMatches(target, '.js-form')) {
      this.currentForm = target;
    }
    target = target.parentNode;
  }
};

Form.prototype.validateInput = function(input) {
  if(input.value === '') return;
  var isEmailInput = input.hasAttribute('type') && input.getAttribute('type') === 'email';
  var isTextInput = input.hasAttribute('type') && input.getAttribute('type') === 'text' || utils.selectorMatches(input, 'textarea');
  var isPasswordInput = input.hasAttribute('type') && input.getAttribute('type') === 'password' && input.getAttribute('data-validate') === 'true';

  if(isEmailInput) {
    this.validateEmail(input);
  } else if(isTextInput) {
    this.validateForRestrictedCharacters(input);
    this.removeEmails(input);
    this.removeUrls(input);
  } else if(isPasswordInput) {
    this.validatePassword(input);
  }
}

Form.prototype.validateEmail = function(input) {
  if(!this.isEmail(input.value)) {
    utils.removeClass(input, 'is-valid');
    utils.addClass(input, 'is-invalid');
    this.showInputError(input, this.errorMessages.invalidEmail);
  } else {
    utils.addClass(input, 'is-valid');
    utils.removeClass(input, 'is-invalid');
    this.hideInputError(input);
  }
}

Form.prototype.validateForRestrictedCharacters = function (input) {
  if(input.getAttribute('data-custom-validation')) return;
  if(!this.isValidString(input.value)) {
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
  let invalidInputs = this.currentForm.querySelector('.is-invalid');
  return invalidInputs ? false : true;
};

Form.prototype.submitForm = function () {
  if(this.currentForm.getAttribute('data-ajax-submit')) return;
  this.currentForm.submit();
};

Form.prototype.removeEmails = function (input) {
  if(this.emailRegex.test(input.value)) {
    input.value = input.value.replace(this.emailRegex, '((Forbidden))');
  }
};

Form.prototype.removeUrls = function (input) {
  if(this.urlRegex.test(input.value)) {
    input.value = input.value.replace(this.urlRegex, '((Forbidden))');
  }
};

Form.prototype.validatePassword = function (input) {
  if(input.value.length < 6) {
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
  var regex = /^[а-яА-ЯЁёІіЇїҐґЄєЩщa-zA-Z0-9.,!"'_\-()@?#:;\s\u00A0\u000D\u000A\000C]+$/gm;
  return regex.test(str);
};

Form.prototype.showInputError = function(input, error) {
  if(input.nextElementSibling) {
    var next = input.nextElementSibling;
    if(utils.selectorMatches(next, '.inputError')) return;
  }

  var errorDiv = document.createElement('div');
  errorDiv.innerText = error;
  utils.addClass(errorDiv, 'inputError');
  utils.insertAfter(errorDiv, input);
}

Form.prototype.hideInputError = function(input) {
  var next, parent;
  if(input.nextElementSibling) {
    next = input.nextElementSibling;
    parent = next.parentNode;
  } else {
    return;
  }

  if(utils.selectorMatches(next, '.inputError')) {
    parent.removeChild(next);
  }
}

Form.prototype.isEmail = function(email) {
  var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
  return regex.test(email);
}

module.exports = Form;
