define([
  'components/utils/utils'
], function (
  utils
) {
  function Form(className) {
    this.forms = document.getElementsByClassName(className);
    this.currentForm = null;
    this.errorTexts = {
      invalidEmail: 'Неправильный формат email\'a',
      invalidCharacters: 'Содержит запрещённые символы'
    }
    this.errors = {};
  }

  Form.prototype.init = function () {
    if(this.forms.length > 0) {
      this.bindEvents();
    }
  };

  Form.prototype.bindEvents = function () {
    document.addEventListener('blur', this.onBlur.bind(this), true);
  };

  Form.prototype.onBlur = function(e) {
    var target = e.target;
    this.setCurrentForm(target);
    this.validateInput(target);
  }

  Form.prototype.validateInput = function(input) {
    if(input.value === '') return;
    var isEmailInput = input.hasAttribute('type') && input.getAttribute('type') === 'email';
    var isTextInput = input.hasAttribute('type') && input.getAttribute('type') === 'text';

    if(isEmailInput) {
      this.validateEmail(input);
    } else if(isTextInput) {
      this.validateForRestrictedCharacters(input);
    }
  }

  Form.prototype.validateEmail = function(input) {
    if(!this.isValidEmail(input.value)) {
      utils.addClass(input, 'is-invalid');
      this.showInputError(input);
    } else {
      utils.removeClass(input, 'is-invalid');
      this.hideInputError(input);
    }
  }

  Form.prototype.validateForRestrictedCharacters = function (input) {
    if(!this.isValidString(input.value)) {
      utils.addClass(input, 'is-invalid');
      this.showInputError(input);
    } else {
      utils.removeClass(input, 'is-invalid');
      this.hideInputError(input);
    }
  };

  Form.prototype.isValidString = function (str) {
    var regex = /^[а-яА-ЯЁёІіЇїҐґЄєЩщa-zA-Z0-9.,!"'_\-()@?:; ]+$/;
    return regex.test(str);
  };

  Form.prototype.showInputError = function(input) {
    var next = input.nextElementSibling;
    if(utils.selectorMatches(next, '.inputError')) return;
    var errorDiv = document.createElement('div');
    if(input.getAttribute('type') === 'email') {
      errorDiv.innerText = this.errorTexts.invalidEmail;
    } else {
      errorDiv.innerText = this.errorTexts.invalidCharacters;
    }
    utils.addClass(errorDiv, 'inputError');
    utils.insertAfter(errorDiv, input);
  }

  Form.prototype.hideInputError = function(input) {
    var next = input.nextElementSibling;

    if(utils.selectorMatches(next, '.inputError')) {
      this.currentForm.removeChild(next);
    }
  }

  Form.prototype.onKeyUp = function (e) {

  };

  Form.prototype.setCurrentForm = function (target) {
    while(target != document) {
      if (target && utils.selectorMatches(target, '.js-form')) {
        this.currentForm = target;
      }
      target = target.parentNode;
    }
  };

  Form.prototype.isValidEmail = function(email) {
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
    return regex.test(email);
  }

  return Form;
});
