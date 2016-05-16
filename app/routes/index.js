var express       = require('express');
var router        = express.Router();
var session       = require('express-session');
var passport      = require('../../config/passport');
var upload        = require('../requestHandlers/upload');
var index         = require('../requestHandlers/index');

// initialize session and passport here to have access to req.user from any other
// route. TODO: check is possible to do the same, but initialize in more appropriate
// place (account.js)
router.use(session({secret: 'secret strategic xxzzz code'}));
router.use(passport.initialize());
router.use(passport.session());

/* GET home page. */
router.get('/', index.render);
router.get('/products-json', index.productsToJson);
router.get('/users-json', index.usersToJson);

router.post('/upload', upload.upload);

module.exports = router;
