var Dropzone = require('dropzone');
var utils = require('../components/utils/utils');

Dropzone.options.myAwesomeDropzone = { // The camelized version of the ID of the form element

  // The configuration we've talked about above
  autoProcessQueue: false,
  uploadMultiple: true,
  parallelUploads: 100,
  maxFiles: 10,
  paramName: "upload",
  previewsContainer: ".dropzone-previews",
  clickable: '.dz-message',
  addRemoveLinks: true,

  // The setting up of the dropzone
  init: function() {

    var myDropzone = this;
    myDropzone.showError = Dropzone.options.myAwesomeDropzone.showError;
    myDropzone.sendFormWithoutImages = Dropzone.options.myAwesomeDropzone.sendFormWithoutImages;
    // First change the button to actually tell Dropzone to process the queue.
    this.element.querySelector("input[type=submit]").addEventListener("click", function(e) {
      // Make sure that the form isn't actually being sent.
      e.preventDefault();
      e.stopPropagation();
      if (myDropzone.getQueuedFiles().length > 0) {
        myDropzone.processQueue();
      } else {
        myDropzone.sendFormWithoutImages();
      }
    });

    // Listen to the sendingmultiple event. In this case, it's the sendingmultiple event instead
    // of the sending event because uploadMultiple is set to true.
    this.on("sendingmultiple", function() {
      // Gets triggered when the form is actually being sent.
      // Hide the success button or the complete form.
    });
    this.on("successmultiple", function(files, response) {
      if (response.isNewItem) {
          var addedAlert = document.querySelector('.js-item-added');
          utils.removeClass(addedAlert, 'is-hidden');
        } else if (response.error) {
          myDropzone.showError(response.error);
        } else {
          var editedAlert = document.querySelector('.js-item-edited');
          utils.removeClass(editedAlert, 'is-hidden');
        }
    });
    this.on("errormultiple", function(files, response) {
      myDropzone.showError('Sorry, something went wrong. Please, try again later.');
    });
  },

  sendFormWithoutImages: function() {
    var form = document.getElementById('my-awesome-dropzone');
    var url = form.getAttribute('action');
    var formData = new FormData(form);
    var xhr = new XMLHttpRequest();

    xhr.open('POST', url);
    xhr.onload = function () {
      if (xhr.status === 200) {
        if (xhr.isNewItem) {
          var addedAlert = document.querySelector('.js-item-added');
          utils.removeClass(addedAlert, 'is-hidden');
          this.showError('test');
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