"use strict";
var Tag = require('../core/models/Tag');

var render = function(req, res, next) {
  var tagName = req.params.id;
  var url = req.path;
  var tag = new Tag();

  tag.loadRelatedProductsWithRelations(tagName, '[products.[images, swapForTags]]', function(products) {
    res.render('index', { data: products, url: url, tag: req.params.id });
  });
}

module.exports.render = render;
