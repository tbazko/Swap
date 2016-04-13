var events = require('events');
var eventEmitter = new events.EventEmitter();
var ProductCollection = require('../models/models').productCollection;
var UserCollection = require('../models/models').userCollection;
var products;

var render = function(req, res, next) {
  var url = req.path;
  eventEmitter
    .once('productsFetched', function(products) {
      res.render('index', { data: products, url: url });
    });
  getProducts(req, res, next);
}

var getProducts = function(req, res, next) {
  ProductCollection.forge()
    .query(function(q) {
      q.where('State', '=', 'FOR_SALE').orWhere('State', '=', 'PENDING');
    })
    .fetch()
    .then(function (collection) {
      products = collection.serialize();
      eventEmitter.emit('productsFetched', products);
    })
    .catch(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
}

var productsToJson = function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');

  if(products) {
    res.send(products);
  } else {
    eventEmitter
      .once('productsFetched', function(products) {
        res.send(products);
      });
    getProducts(req, res, next);
  }
}

var usersToJson = function(req, res, next) {
  var users;
  UserCollection.forge()
    .fetch()
    .then(function (collection) {
      users = collection.toJSON();
      // make this on event!
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(users));
    })
    .catch(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
}

module.exports.getProducts = getProducts;
module.exports.render = render;
module.exports.productsToJson = productsToJson;
module.exports.usersToJson = usersToJson;
