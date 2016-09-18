"use strict";
let events = require('events');
let eventEmitter = new events.EventEmitter();
const Product = require('../core/models/Product');

let render = function(req, res, next) {
  let url = req.path;
  let product = new Product();

  product.getActiveWithRelations('[images, swapForTags]', function(err, products) {
    res.render('index', { products: products, url: url });
  });

}

module.exports.render = render;
