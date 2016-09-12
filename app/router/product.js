var express = require('express');
var router = express.Router();
var product = require('../requestHandlers/product');

router.get('/:id', product.openDetailsPage);
router.post('/:id/swap-request', product.swapRequest);

module.exports = router;
