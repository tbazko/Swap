"use strict";
const Product = require('../core/models/Product');
const SwapRequest = require('../core/models/SwapRequest');

let openDetailsPage = function(req, res, next) {
  let productId = req.params.id;
  let product = new Product();

  product
    .getWithRelations(productId, '[user.[products], images, tags, swapForTags]', function(err, items) {
      if(items) {
        res.render('product', { product: items[0], author: items[0].user});
      } else {
        res.redirect('/');
        res.end();
      }
    })
}

let swapRequest = function(req, res, next) {
  let newSwapRequest = new SwapRequest();
  newSwapRequest.create(req);
  res.send({ data: true });
}

module.exports.openDetailsPage = openDetailsPage;
module.exports.swapRequest = swapRequest;
