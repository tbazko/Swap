"use strict";
let events = require('events');
let eventEmitter = new events.EventEmitter();
const ProductModel = require('../core/models/ProductModel');

let render = function(req, res, next) {
  let url = req.path;
  let productModel = new ProductModel();

  productModel.getActiveWithRelations('[images, swapForTags]', function(err, products) {
    console.log(products.images);
    res.render('index', { data: products, url: url });
  });

}

module.exports.render = render;
