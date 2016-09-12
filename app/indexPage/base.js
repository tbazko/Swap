"use strict";
var EventEmitter = require('events').EventEmitter;
var fs = require('fs');
let express       = require('express');
let router        = express.Router();
let session       = require('express-session');
let passport      = require('../../config/passport');
let upload        = require('../requestHandlers/upload');
let controller    = require('./controller');

// initialize session and passport here to have access to req.user from any other
// route. TODO: check is possible to do the same, but initialize in more appropriate
// place (account.js)
router.use(session({secret: 'secret strategic xxzzz code'}));
router.use(passport.initialize());
router.use(passport.session());

/* GET home page. */
router.get('/', controller.render);

router.post('/upload', upload.upload);

module.exports = router;
