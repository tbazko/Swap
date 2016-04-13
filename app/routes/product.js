var express = require('express');
var router = express.Router();
var product = require('../requestHandlers/product');

router.get('/:id', product.openDetailsPage);

module.exports = router;
