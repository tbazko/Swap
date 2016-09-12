"use strict";

let express       = require('express');
let router        = express.Router();
let session       = require('express-session');
let passport      = require('../../config/passport');
let upload        = require('../requestHandlers/upload');
let index         = require('../requestHandlers/index');

const EventEmitter = require('events');
class GlobalEventEmitter extends EventEmitter {}
const globalEventEmitter = new GlobalEventEmitter();

globalEventEmitter
  .on('swapRequestCreated', function() {
    console.log('!!!!!!!!!!!! New swap request created event caught !!!!!!!!!!!!!');
  });
// initialize session and passport here to have access to req.user from any other
// route. TODO: check is possible to do the same, but initialize in more appropriate
// place (account.js)
router.use(session({secret: 'secret strategic xxzzz code'}));
router.use(passport.initialize());
router.use(passport.session());

/* GET home page. */
router.get('/', index.render);

router.post('/upload', upload.upload);

module.exports = router;
