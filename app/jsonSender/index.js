"use strict";
let express       = require('express');
let app           = express();
let controller    = require('./controller');
// let UserCollection = require('../core/userCollection');
// let ProductCollection = require('../core/collections/ProductCollection');

// router.get('/json/products', controller.sendCollectionAsJson.bind(this, ProductCollection));
// router.get('/json/users', controller.sendCollectionAsJson.bind(this, UserCollection));

module.exports = app;
