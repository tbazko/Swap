var express = require('express');
var events = require('events');
var eventEmitter = new events.EventEmitter();
var router = express.Router();
var mysql = require('./mysql').pool;
var requestHandlers = require('./requestHandlers');

// First you need to create a connection to the db

var updated;
var data = getProducts();

function getProducts() {
  mysql.getConnection(function(err, connection) {
    connection.query('SELECT ProductId, Name, Image1, Description, SUBSTR(Description, 1, 60) AS ShortDescription FROM products WHERE State="FOR_SALE" OR State="PENDING" ORDER BY ProductId DESC', function(err, rows){
      if(err) throw err;
      data = rows;
      connection.release();
    });
  });
  return data;
}

/* GET home page. */
router.get('/', function(req, res, next) {
  if(updated) {
    var updatedData = getProducts();
    res.render('index', { data: updatedData, url: req.path });
  } else {
    var url = req.path;
    res.render('index', { data: data, url: url });
  }
});

router.get('/my-list', function(req, res, next) {
  res.render('myList', {url: req.path});
});

router.get('/add-product', function(req, res, next) {
  res.render('addProduct', {url: req.path});
});

router.post('/upload', function(req, res, next) {
  // Hard coded for now, should be changed when logging in is implemented
  var userId = 1;
  updated = true;
  requestHandlers.upload(req, res, userId);
});

router.get('/products-json', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(data));
});

router.get('/users-json', function(req, res, next) {
  var users;
  mysql.getConnection(function(err, connection) {
    connection.query('SELECT * from users', function(err, rows){
      if(err) throw err;
      users = rows;
      connection.release();
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(users));
    });
  });
});

module.exports = router;
