var express = require('express');
var router = express.Router();
var passport = require('passport');
var session       = require('express-session');
var isSignedIn = require('../requestHandlers/account').isSignedIn;
var upload = require('../requestHandlers/upload');
var index = require('../requestHandlers/index');
var userItems = require('../requestHandlers/userItems');

router.use(session({secret: 'secret strategic xxzzz code'}));
router.use(passport.initialize());
router.use(passport.session());


/* GET home page. */
router.get('/', index.render);
router.get('/products-json', index.productsToJson);
router.get('/users-json', index.usersToJson);
router.get('/my-items', userItems.render);

router.post('/destroy-item', userItems.destroyItem);
router.post('/upload', upload.upload);

module.exports = router;
