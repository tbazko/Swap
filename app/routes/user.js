var express = require('express');
var router = express.Router();
var mysql = require('../../config/database').pool;

var userId;
var userSql = "SELECT * FROM users WHERE UserId = ? LIMIT 1";

router.get('/:id', function(req, res, next) {
  userId = req.params.id;
  console.log(userId);
  mysql.getConnection(function(err, connection) {
    connection.query(userSql, [userId], function(err, users) {
      if(err) throw err;

      user = users[0];
      console.log(user);
      res.render('user', { user: user });
      connection.release();
    })
  });
});

module.exports = router;
