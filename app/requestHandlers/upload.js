var events = require('events');
var eventEmitter = new events.EventEmitter();
var mkdirp = require('mkdirp');

var querystring = require("querystring"),
    fs          = require("fs"),
    formidable  = require("formidable");
var ProductModel = require('../models/models').productModel;

function upload(req, res) {
  var folderPath = 'public/images/products/users/1';

  eventEmitter
    .once('pathExists', function(event) {
      uploadImage(req, res, folderPath);
    })
    .once('formParsed', createNewProductInDB);

  checkImageFolderPath(folderPath);
}

function createNewProductInDB(fields) {
  var newProduct = new ProductModel({
    Name: fields.name,
    State: 'FOR_SALE',
    Image1: fields.fileName,
    Description: fields.description,
    UserId: fields.userId,
    ProductCondition: fields.productCondition
  });
  newProduct.save();
}

var uploadImage = function uploadImage(req, res, folderPath) {
  var form = new formidable.IncomingForm();
  form.parse(req, function(error, fields, files) {
    fields.fileName = files.upload.name;
    eventEmitter.emit('formParsed', fields);
      /* Possible error on Windows systems:
      tried to rename to an already existing file */
    var imagePath = folderPath + '/' + files.upload.name;

    fs.rename(files.upload.path, imagePath, function(err) {
      if (err) {
        fs.unlink(imagePath);
        fs.rename(files.upload.path, imagePath);
      }
    });
    res.render('addProduct', {currentUrl: req.path});
  });
}

function checkImageFolderPath(folderPath) {
  mkdirp(folderPath, function(err) {
    if(err) return console.log(err);
    eventEmitter.emit('pathExists');
  });
}

exports.upload = upload;
