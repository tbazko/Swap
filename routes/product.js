var express = require('express');
var router = express.Router();
var mysql = require('./mysql').pool;

var productId;
var product;

router.get('/:id', function(req, res, next) {
  
  productId = req.params.id;

  mysql.getConnection(function(err, connection) {
    connection.query('SELECT * FROM products WHERE ProductId = ' + productId +';', function(err, rows) {
      if(err) throw err;
      product = rows;
      connection.release();
      res.render('product', { data: product });
    });
  })
  
});

module.exports = router;