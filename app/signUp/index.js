"use strict";
let express = require('express');
let app = express();
let controller = require('./controller');
app.set('views', __dirname);

app.get('/account/signup', controller.signUp);
app.post('/account/signup', controller.signUpPost);

module.exports = app;
