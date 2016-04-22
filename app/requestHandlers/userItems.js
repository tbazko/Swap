var events = require('events');
var eventEmitter = new events.EventEmitter();
var Models = require('../models/models');
var ProductModel = Models.productModel;
var ProductCollection = Models.productCollection;
var cloudinary = require('../../config/cloudinary');
var shared = require('./shared/base');

var render = function(req, res, next) {
  if(!req.user) {
    res.redirect('/signin');
    return;
  }

  var url = req.path;
  eventEmitter
    .once('productsFetched', function(products) {
      res.render('userItems', { data: products, url: url });
    });
  getProducts(req, res, next);
}

var getProducts = function(req, res, next) {
  ProductCollection.forge()
    .query(function(q) {
      q.where('userId', '=', req.user.get('userId'));
    })
    .fetch({withRelated: ['images'], debug: false})
    .then(function (collection) {
      shared.getProductsList(collection, eventEmitter);
    })
    .catch(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
}

var destroyItem = function(req, res, next) {
  var id = req.body.productId;
  ProductModel.forge({productId: id})
    .fetch({withRelated: ['images']}).then(function(product) {
      var images = product.related('images');
      images.each(function(image) {
        cloudinary.uploader.destroy(image.get('imageId'));
        image.destroy();
      });

      product.tags().detach();
      product.swapForTags().detach();
      product.destroy().then(function() {
        res.redirect('/my-items');
      });

    }).catch(function (err) {
      console.log(err);
    });
}

module.exports.render = render;
module.exports.destroyItem = destroyItem;
