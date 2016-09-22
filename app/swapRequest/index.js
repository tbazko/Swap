"use strict";
let express       = require('express');
let app           = express();
let controller    = require('./controller');
let helpers       = require('../helpers/index');
app.set('views', __dirname);

app.get('/requests', helpers.signInRedirect, controller.renderOverview);
app.get('/requests/:id', helpers.signInRedirect, controller.renderOne);
app.post('product/:id/swap-request', controller.create);

module.exports = app;
