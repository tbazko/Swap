var events = require('events');
var eventEmitter = new events.EventEmitter();
var mkdirp = require('mkdirp');
var cloudinary = require('../../config/cloudinary');

var querystring = require("querystring"),
    fs          = require("fs"),
    formidable  = require("formidable");
var Models = require('../models/models');
var ProductModel = Models.productModel;
var ProductImageModel = Models.productImageModel;

function upload(req, res) {
  eventEmitter
    .once('formParsed', createNewProductInDB);
  uploadImage(req, res);
}

function createNewProductInDB(fields, files) {
  var newProduct = new ProductModel({
    name: fields.name,
    state: 'FOR_SALE',
    description: fields.description,
    userId: fields.userId,
    condition: fields.productCondition
  });

  newProduct.save().then(function(model) {
    var productId = model.get('productId');
    var name = files.upload.name.replace(/\.jpg|\.jpeg|\.bmp|\.gif/gmi, '');
    var public_id = productId + '/' + name;

    var productImage = new ProductImageModel({
      imageId: public_id,
      productId: productId
    });

    cloudinary.uploader.upload(files.upload.path,
      function(result) {
      }, {public_id: public_id}
    );

    productImage.save(null, {method: 'insert'});
  });
}

var uploadImage = function uploadImage(req, res) {
  var form = new formidable.IncomingForm();
  form.parse(req, function(error, fields, files) {

    eventEmitter.emit('formParsed', fields, files);

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
    res.render('addProduct', {url: req.path, userId: fields.userId});
  });
}

// function checkImageFolderPath(folderPath) {
//   mkdirp(folderPath, function(err) {
//     if(err) return console.log(err);
//     eventEmitter.emit('pathExists');
//   });
// }

exports.upload = upload;
