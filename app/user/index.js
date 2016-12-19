"use strict";
let express    = require('express');
let app        = express();
let controller = require('./controller');
app.set('views', __dirname);

// app.get('/user/:id', controller.loadInfo);

module.exports = app;
