var express = require('express');
var router = express.Router();
var mysql = require('./mysql').pool;

// First you need to create a connection to the db
var data;
mysql.getConnection(function(err, connection) {
  connection.query('SELECT * FROM products WHERE State="FOR_SALE" OR State="PENDING" ORDER BY ProductId DESC', function(err, rows){
    if(err) throw err;
    data = rows;
    connection.release();
  });
})


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { data: data });
});

module.exports = router;
