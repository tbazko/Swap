var events = require('events');
var eventEmitter = new events.EventEmitter();
var ProductModel = require('../../core/modelsDB/ProductModel');
var cloudinary = require('../../../config/cloudinary');
var shared = require('../shared/base');

var render = function(req, res, next) {
  if(!req.user) {
    res.redirect('/account/signin');
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
      q.where('user_id', '=', req.user.get('id'));
    })
    .fetch({withRelated: ['images', 'swapForTags', 'tags'], debug: false})
    .then(function (collection) {
      shared.getProductsList(collection, eventEmitter);
    })
    .catch(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
}

var destroyItem = function(req, res, next) {
  ProductModel.forge({id: req.body.productId})
    .fetch({withRelated: ['images']}).then(function(product) {
      var images = product.related('images');
      images.each(function(image) {
        cloudinary.uploader.destroy(image.get('id'));
        image.destroy();
      });

      product.tags().detach();
      product.swapForTags().detach();
      product.swapRequestsAsMaster().detach();
      product.swapRequestsAsSlave().detach();
      product.destroy().then(function() {
        res.redirect('/account/my-items');
      });

    }).catch(function (err) {
      console.log(err);
    });
}

var editItem = function(req, res, next) {
  ProductModel.forge({id: req.body.productId})
    .fetch({withRelated: ['images']}).then(function(product) {
      res.render('editItemForm', { product: product.serialize(), userId: req.user.get('id'), newItem: 0, url: req.path });
    }).catch(function (err) {
      console.log(err);
    });
}

var getItemsForSwap = function(req, res, next) {
  var url = req.path;
  var user = {
    userId: req.user.get('id'),
    email: req.user.get('email')
  };
  eventEmitter
    .once('productsFetched', function(products) {
      res.send({ data: products, url: url, user: user });
    });
  getProducts(req, res, next);
}

module.exports.render = render;
module.exports.destroyItem = destroyItem;
module.exports.editItem = editItem;
module.exports.getItemsForSwap = getItemsForSwap;
