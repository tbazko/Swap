"use strict";
let express       = require('express');
let router        = express.Router();
let controller    = require('./controller');
// let UserCollection = require('../core/userCollection');
// let ProductCollection = require('../core/collections/ProductCollection');

// router.get('/products', controller.sendCollectionAsJson.bind(this, ProductCollection));
// router.get('/users', controller.sendCollectionAsJson.bind(this, UserCollection));

module.exports = router;
