var express = require('express');
var router = express.Router();
var isSignedIn = require('../requestHandlers/account').isSignedIn;
var upload = require('../requestHandlers/upload');
var index = require('../requestHandlers/index');


/* GET home page. */
router.get('/', index.render);
router.get('/products-json', index.productsToJson);
router.get('/users-json', index.usersToJson);
router.get('/my-list', function(req, res, next) {
  res.render('myList', {url: req.path});
});

router.post('/upload', upload.upload);

module.exports = router;
