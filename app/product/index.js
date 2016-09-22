"use strict";
let express     = require('express');
let app         = express();
let controller  = require('./controller');
let helpers     = require('../helpers/index');
app.set('views', __dirname);

app.get('/product/:id', controller.render);
app.get('/product-create', helpers.signInRedirect, controller.renderForm);
app.post('/product-destroy', controller.destroy);
app.post('/product-edit', helpers.signInRedirect, controller.renderForm);
app.post('/product-create', controller.create);


module.exports = app;
