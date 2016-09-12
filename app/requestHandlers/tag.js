"use strict";
var TagModel = require('../core/models/TagModel');

var render = function(req, res, next) {
  getProducts(req, res, next);
}

var getProducts = function(req, res, next) {
  var tagName = req.params.id;
  var url = req.path;
  var tagModel = new TagModel();

  tagModel.loadRelatedProductsWithRelations(tagName, '[products.[images, swapForTags]]', function(products) {
    res.render('index', { data: products, url: url, tag: req.params.id });
  });
}

module.exports.render = render;
