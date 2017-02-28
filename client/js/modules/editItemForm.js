var utils = require('../components/utils/utils');
var TagTransformer = require('../components/TagTransformer');
var CategorySelector = require('../components/CategorySelector');
var FormValidator = require('../components/FormValidator');
var Dropzone = require('../components/Dropzone');

var EditItemForm = {
  initialize: function () {
    var imagesFromDB = document.getElementById('imagesFromDB');
    if(imagesFromDB) {
      this.imagesToDelete = document.getElementById('imagesToDelete');
      this.bindEvents();
    }
    this.category = new CategorySelector();
    this.tags = new TagTransformer('tags');
    this.swapForTags = new TagTransformer('swapForTags');
    this.validator = new FormValidator('js-form');
    this.validator.init();
    this.category.init();
    this.tags.init();
    this.swapForTags.init();
  },

  bindEvents: function() {
    imagesFromDB.addEventListener('click', this.onClick.bind(this), true);
  },

  onClick: function(e) {
    var deleteButton = utils.closest(e.target, '.js-delete-image');
    if(deleteButton) {
      e.preventDefault();
      this.clickedDeleteButton = deleteButton;
      this.addToImagesToDeleteInput();
    }
  },

  addToImagesToDeleteInput: function() {
    var imageId = this.clickedDeleteButton.getAttribute('data-image-id');
    if(this.imagesToDelete.value === '') {
      this.imagesToDelete.value = imageId;
    } else {
      imagesToDelete.value += ',' + imageId;
    }
  }
}

EditItemForm.initialize();