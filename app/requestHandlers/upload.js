var events = require('events');
var eventEmitter = new events.EventEmitter();
var mkdirp = require('mkdirp');
var cloudinary = require('../../config/cloudinary');

var querystring = require("querystring"),
    fs          = require("fs"),
    formidable  = require("formidable");
var ProductModel = require('../models/models').productModel;
var ProductImageModel = require('../models/models').productImageModel;

function upload(req, res) {
  var folderPath = 'public/images/products/users/1';

  eventEmitter
    .once('formParsed', createNewProductInDB);
  uploadImage(req, res);
}

function createNewProductInDB(fields) {
  var newProduct = new ProductModel({
    name: fields.name,
    state: 'FOR_SALE',
    description: fields.description,
    userId: fields.userId,
    condition: fields.productCondition
  });

  newProduct.save().then(function(model) {
    var productImage = new ProductImageModel({
      imageId: cloudinary.image(fields.fileName, { alt: fields.name }),
      productId: model.get('productId')
    });

    productImage.save(null, {method: 'insert'});
  });
}

var uploadImage = function uploadImage(req, res) {
  var form = new formidable.IncomingForm();
  form.parse(req, function(error, fields, files) {
    var name = files.upload.name.replace(/\.jpg|\.jpeg|\.bmp|\.gif/gmi, '');
    fields.fileName = 'users/' + fields.userId + '/' + name;
    eventEmitter.emit('formParsed', fields);
    cloudinary.uploader.upload(files.upload.path,
      function(result) {
        // console.log(result);
      }, {public_id: fields.fileName}
    );
      /* Possible error on Windows systems:
      tried to rename to an already existing file */
    // var imagePath = folderPath + '/' + files.upload.name;
    //
    // fs.rename(files.upload.path, imagePath, function(err) {
    //   if (err) {
    //     fs.unlink(imagePath);
    //     fs.rename(files.upload.path, imagePath);
    //   }
    // });
    res.render('addProduct', {currentUrl: req.path});
  });
}

// function checkImageFolderPath(folderPath) {
//   mkdirp(folderPath, function(err) {
//     if(err) return console.log(err);
//     eventEmitter.emit('pathExists');
//   });
// }

exports.upload = upload;
