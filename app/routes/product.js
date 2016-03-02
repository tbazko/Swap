var express = require('express');
var router = express.Router();
var mysql = require('../../config/database').pool;

var productId;
var product;
var user;
var sql = "SELECT * FROM ?? WHERE ?? = ? LIMIT 1";
var sqlImgs = "SELECT Image1, Name, ProductId FROM products WHERE UserId = ?";

router.get('/:id', function(req, res, next) {

  productId = req.params.id;

  mysql.getConnection(function(err, connection) {
    connection.query(sql, ['products', 'ProductId', productId], function(err, products) {
      if(err) throw err;
      console.log(products.length);

      if(products.length === 0) {
        res.redirect('/');
        res.end();
      } else {
        product = products[0];
        product.ShortDescription = product.Description.slice(0, 60);
        var userId = product.UserId;

        connection.query(sql, ['users', 'UserId', userId], function(err, users) {
          if(err) throw err;
          user = users[0];

          connection.query(sqlImgs, [userId], function(err, userProducts) {
            user.products = userProducts;
            res.render('product', { product: product, author: user });
            connection.release();
          });
        });
      }
    });
  });

});

module.exports = router;