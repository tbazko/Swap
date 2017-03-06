var Dropzone = require('dropzone');
var utils = require('../components/utils/utils');

Dropzone.autoDiscover = false;
var myAwesomeDropzone = new Dropzone('form#my-awesome-dropzone', {
  // The configuration we've talked about above
  autoQueue: false,
  autoProcessQueue: false,
  uploadMultiple: true,
  parallelUploads: 100,
  maxFiles: 10,
  paramName: "upload",
  previewsContainer: ".dropzone-previews",
  clickable: '.dz-message',
  addRemoveLinks: true,

  // The setting up of the dropzone
  init: function () {
    var canvas = document.createElement('canvas');
    var myDropzone = this;
    var filelist = [];
    var resizeImgList = [];

    myDropzone.showError = myDropzone.options.showError;
    myDropzone.sendFormWithoutImages = myDropzone.options.sendFormWithoutImages;
    // First change the button to actually tell Dropzone to process the queue.
    this.element.querySelector("input[type=submit]").addEventListener("click", function (e) {
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
    this.on("sendingmultiple", function () {
      // Gets triggered when the form is actually being sent.
      // Hide the success button or the complete form.
    });
    this.on("successmultiple", function (files, response) {
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
    this.on("errormultiple", function (files, response) {
      myDropzone.showError('Sorry, something went wrong. Please, try again later.');
    });

    this.on("addedfile", function (origFile) {
      var MAX_WIDTH = 800;
      var MAX_HEIGHT = 600;
      var reader = new FileReader();

      // Convert file to img
      reader.addEventListener("load", function (event) {
        var origImg = new Image();
        origImg.src = event.target.result;
        origImg.addEventListener("load", function (event) {
          var width = event.target.width;
          var height = event.target.height;
          // Don't resize if it's small enough
          if (width <= MAX_WIDTH && height <= MAX_HEIGHT) {
            myDropzone.enqueueFile(origFile);
            return;
          }
          // Calc new dims otherwise
          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }
          // Resize
          var canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;

          var ctx = canvas.getContext("2d");
          ctx.drawImage(origImg, 0, 0, width, height);

          var resizedFile = base64ToFile(canvas.toDataURL('image/jpeg', 0.6), origFile);
          // Replace original with resized
          var origFileIndex = myDropzone.files.indexOf(origFile);
          myDropzone.files[origFileIndex] = resizedFile;

          // Enqueue added file manually making it available for
          // further processing by dropzone
          resizedFile.status = "added";
          resizedFile.accepted = true;
          myDropzone.enqueueFile(resizedFile);
        });
      });

      reader.readAsDataURL(origFile);
    });
  },

  sendFormWithoutImages: function () {
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
});

function base64ToFile(dataURI, origFile) {
  var byteString, mimestring;

  if(dataURI.split(',')[0].indexOf('base64') !== -1 ) {
    byteString = atob(dataURI.split(',')[1]);
  } else {
    byteString = decodeURI(dataURI.split(',')[1]);
  }

  mimestring = dataURI.split(',')[0].split(':')[1].split(';')[0];

  var content = new Array();
  for (var i = 0; i < byteString.length; i++) {
    content[i] = byteString.charCodeAt(i);
  }

  var newFile = new File(
    [new Uint8Array(content)], origFile.name, {type: mimestring}
  );

  // Copy props set by the dropzone in the original file
  var origProps = [
    "upload", "status", "previewElement", "previewTemplate", "accepted"
  ];

  origProps.forEach(function(i, p) {
    newFile[p] = origFile[p];
  });

  return newFile;
}