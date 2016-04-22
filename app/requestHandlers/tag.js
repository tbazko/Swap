var events = require('events');
var eventEmitter = new events.EventEmitter();
var Tag = require('../models/models').tagModel;
var Product = require('../models/models').productModel;
var shared = require('./shared/base');

var render = function(req, res, next) {
  var url = req.path;
  eventEmitter
    .once('productsFetched', function(products) {
      res.render('index', { data: products, url: url });
    });
  getProducts(req, res, next);
}

var getProducts = function(req, res, next) {
  var tagName = req.params.id;
  Tag.forge({name: tagName})
    .fetch({withRelated: ['products']}).then(function(tag) {
      tag.related('products')
        .query(shared.getActiveProducts)
        .fetch({withRelated: ['images']})
        .then(function(collection) {
          shared.getProductsList(collection, eventEmitter);
        })
        .catch(function (err) {
          res.status(500).json({error: true, data: {message: err.message}});
        });
    });
}

module.exports.render = render;
