"use strict";
let express       = require('express');
let app           = express();
let controller    = require('./controller');
let helpers       = require('../helpers/index');

app.post('/requests/:id/message', helpers.signInRedirect, controller.post);

module.exports = app;
