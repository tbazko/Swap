var utils = require('../components/utils/utils');
var TagTransformer = require('../components/TagTransformer');
var CategorySelector = require('../components/CategorySelector');
var FormValidator = require('../components/FormValidator');
var Dropzone = require('../components/Dropzone');

var EditItemForm = {
  initialize: function () {
    this.form = document.getElementById('editItemForm');
    this.bindEvents();
    this.category = new CategorySelector();
    this.tags = new TagTransformer('tags');
    this.swapForTags = new TagTransformer('swapForTags');
    this.validator = new FormValidator('js-form');
    this.validator.init();
    this.category.init();
    this.tags.init();
    this.swapForTags.init();
  },

  bindEvents: function () {
    this.form.addEventListener('submit', this.formOnSubmit.bind(this), false);
  },

  formOnSubmit: function (e) {
    e.preventDefault();
    var url = this.form.getAttribute('action');
    var formData = new FormData(this.form);
    var xhr = new XMLHttpRequest();

    xhr.open('POST', url);
    xhr.onload = function () {
      if (xhr.status === 200) {
        if (xhr.isNewItem) {
          var addedAlert = document.querySelector('.js-item-added');
          utils.removeClass(addedAlert, 'is-hidden');
        } else if (xhr.error) {
          this.showError(xhr.error);
        } else {
          var editedAlert = document.querySelector('.js-item-edited');
          utils.removeClass(editedAlert, 'is-hidden');
        }
      }
      else if (xhr.status !== 200) {
        this.showError('Sorry, something went wrong. Please, try again later.');
      }
    };
    xhr.send(formData);
  },
  showError: function (errorText) {
    var errorAlert = document.querySelector('.js-item-edited');
    errorAlert.innerText = errorText;
    utils.removeClass(errorAlert, 'is-hidden');
  }
}

EditItemForm.initialize();