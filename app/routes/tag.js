var express = require('express');
var router = express.Router();
var tag = require('../requestHandlers/tag');

router.get('/:id', tag.render);

module.exports = router;
