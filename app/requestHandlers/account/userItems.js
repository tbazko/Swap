"use strict";
var events = require('events');
var eventEmitter = new events.EventEmitter();
var Product = require('../../core/models/Product');

var render = function(req, res, next) {
  let url = req.path;
  if(!req.user) {
    res.redirect('/account/signin');
    return;
  }

  eventEmitter
    .once('productsFetched', function(products) {
    res.render('userItems', { data: products, url: url });
  });

  getProducts(req, res, next);
}

var getProducts = function(req, res, next) {
  let product = new Product();
  product.identifier = 'user_id';

  product
    .getWithRelations(req.user.id, '[images, tags, swapForTags]', function(err, products) {
      eventEmitter.emit('productsFetched', products);
    });
}

var destroyItem = function(req, res, next) {
  let product = new Product();
  product.destroy(req.body.productId, function(err) {
    if (err) console.log(err);

    res.redirect('/account/my-items');
  });
}

var editItem = function(req, res, next) {
  let product = new Product();

  product
    .getWithRelations(req.body.productId, 'images', function(err, model) {
      res.render('editItemForm', { product: model[0], userId: req.user.idea, newItem: 0, url: req.path });
    })
}

var getItemsForSwap = function(req, res, next) {
  var url = req.path;
  var user = {
    userId: req.user.id,
    email: req.user.email
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
