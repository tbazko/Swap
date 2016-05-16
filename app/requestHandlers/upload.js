var events = require('events');
var eventEmitter = new events.EventEmitter();
var cloudinary = require('../../config/cloudinary');

var querystring = require("querystring"),
    fs          = require("fs"),
    formidable  = require("formidable");
var Models = require('../models/models');
var Product = Models.productModel;
var ProductImage = Models.productImageModel;
var Tag = Models.tagModel;
var SwapForTag = Models.swapForTagModel;

function upload(req, res) {
  eventEmitter
    .once('formParsed', createNewProductInDB);
  uploadImage(req, res);
}

function createNewProductInDB(fields, files) {
  var newProduct = new Product({
    name: fields.name,
    state: 'FOR_SALE',
    description: fields.description,
    user_id: fields.userId,
    condition: fields.productCondition,
  });

  newProduct.save().then(function(product) {
    var productId = product.get('id');
    var name = files.upload.name.replace(/\.jpg|\.jpeg|\.bmp|\.gif/gmi, '');
    var public_id = productId + '/' + name;

    var productImage = new ProductImage({
      id: public_id,
      product_id: productId
    });

    cloudinary.uploader.upload(files.upload.path,
      function(result) {
      }, {public_id: public_id}
    );

    //
    // TODO: If same tags are being added simultaneously,
    // getting duplicate error!!! Fix needed
    //

    if(fields.tags) {
      var tags = fields.tags.replace(/\s+/g, '');
      var tagsArray = tags.split(',');
      tagsArray.forEach(function(value, index) {
        addTag(Tag, true, value, product);
      });
    }

    if(fields.swapForTags && fields.tags) {
      var swapForTags = fields.swapForTags.replace(/\s+/g, '');
      var swapForTagsArray = swapForTags.split(',');
      swapForTagsArray.forEach(function(value, index) {
        addTag(SwapForTag, false, value, product);
      });
    }

    productImage.save(null, {method: 'insert'});
  });
}

var addTag = function(modelName, isTag, tagName, product) {
  new modelName({name: tagName}).fetch()
    .then(function(tag) {
      if(tag) {
        if(isTag) {
          product.tags().attach(tag);
        } else {
          product.swapForTags().attach(tag);
        }
        return;
      } else {
        var newTag = new Tag({
          name: tagName
        });

        newTag.save().then(function(tag) {
          if(isTag) {
            product.tags().attach(tag);
          } else {
            product.swapForTags().attach(tag);
          }
        });
      }
    });
}

var uploadImage = function uploadImage(req, res) {
  var form = new formidable.IncomingForm();
  form.parse(req, function(error, fields, files) {

    eventEmitter.emit('formParsed', fields, files);
    res.render('addProduct', {url: req.path, userId: fields.userId, itemAdded: true});
  });
}

exports.upload = upload;
