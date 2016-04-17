var events = require('events');
var eventEmitter = new events.EventEmitter();
var Models = require('../models/models');
var ProductModel = Models.productModel;
var ProductImage = Models.productImage;
var ProductImageCollection = Models.productImageCollection;
var ProductImage = Models.productImage;
var ProductCollection = Models.productCollection;
var UserCollection = Models.userCollection;
var cloudinary = require('../../config/cloudinary');
var knex = require('../../config/database').knex;
var DB = require('../../config/database').DB;

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
  console.log(req.user.get('userId'));
  getProducts(req, res, next);
}

var getProducts = function(req, res, next) {
  ProductCollection.forge()
    .query(function(q) {
      q.where('userId', '=', req.user.get('userId')).andWhere('state', '=', 'FOR_SALE').orWhere('state', '=', 'PENDING');
    })
    .fetch({withRelated: ['images'], debug: false})
    .then(function (collection) {
      var product;
      var products = [];
      collection.forEach(function(model, key) {
        var imageId = model.related('images').first() ? model.related('images').first().get('imageId') : 'sample';

        product = {
          productId: model.get('productId'),
          name: model.get('name'),
          image: cloudinary.image(imageId + '.jpg', {width: 230, height: 220, crop: 'fill', gravity: 'face'})
        };
        products.push(product);
      });

      eventEmitter.emit('productsFetched', products);
    })
    .catch(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
}

var destroyItem = function(req, res, next) {
  var id = req.body.productId;
  ProductImageCollection.forge({productId: id})
    .fetch().then(function(collection) {
      collection.each(function(model) {
        cloudinary.uploader.destroy(model.get('imageId'));
        model.destroy();
      });

      ProductModel.forge({productId: id})
        .destroy().then(function() {
          res.redirect('/my-items');
        });
    }).catch(function (err) {
      console.log(err);
    });
}

module.exports.render = render;
module.exports.destroyItem = destroyItem;
