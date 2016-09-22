"use strict";
let events = require('events');
let eventEmitter = new events.EventEmitter();
const Product = require('../core/models/Product');
const Tag = require('../core/models/Tag');

let render = function(req, res, next) {
  let product = new Product();

  product.getActiveWithRelations('[images, swapForTags, tags]', function(err, products) {
    res.render('index', { products: products, url: req.path });
  });
}

let renderByTag = function(req, res, next) {
  var tagName = req.params.id;
  var tag = new Tag();

  tag.loadRelatedProductsWithRelations(tagName, '[products.[images, swapForTags]]', function(err, products) {
    if(err) { return res.redirect('/'); }
    res.render('index', { products: products, url: req.path, tag: req.params.id });
  });
}

let renderByUser = function(req, res, next) {
  let url = req.path;
  if(!req.user) {
    res.redirect('/account/signin');
    return;
  }

  eventEmitter
    .once('productsFetched', function(products) {
    res.render('userItems', { products: products, url: url });
  });

  getProducts(req, res, next);
}

var getItemsForSwap = function(req, res, next) {
  var url = req.path;
  var user = {
    userId: req.user.id,
    email: req.user.email
  };
  eventEmitter
    .once('productsFetched', function(products) {
      res.send({ products: products, url: url, user: user });
    });
  getProducts(req, res, next);
}

function getProducts(req, res, next) {
  let product = new Product();
  product.identifier = 'user_id';

  product
    .getWithRelations(req.user.id, '[images, tags, swapForTags]', function(err, products) {
      eventEmitter.emit('productsFetched', products);
    });
}


module.exports.render = render;
module.exports.renderByTag = renderByTag;
module.exports.renderByUser = renderByUser;
module.exports.getItemsForSwap = getItemsForSwap;
