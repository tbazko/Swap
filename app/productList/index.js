"use strict";
let express       = require('express');
let app           = express();
let controller    = require('./controller');
let helpers       = require('../helpers/index');
app.set('views', __dirname);

app.get('/', controller.render);
app.get('/tag/:id', controller.renderByTag);
app.get('/my-items', controller.renderByUser);
app.post('/getItemsForSwap', helpers.isAuthenticated, controller.getItemsForSwap);

module.exports = app;
