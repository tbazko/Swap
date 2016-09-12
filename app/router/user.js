var express = require('express');
var router = express.Router();
var userHandler = require('../requestHandlers/user');

router.get('/:id', userHandler.loadInfo);

module.exports = router;
