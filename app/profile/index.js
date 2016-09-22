"use strict";
let express       = require('express');
let app           = express();
let controller    = require('./controller');
app.set('views', __dirname);

app.get('/account/profile', controller.profile);

module.exports = app;
