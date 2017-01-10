"use strict";
const express = require('express');
const app = express();
const fs  = require('fs');
let routerFiles = fs.readdirSync(__dirname);

routerFiles.forEach((file) => {
  if(file != 'index.js') {
    let regex = /\.js$/gi;
    let fileName = file.replace(regex, '');
    app.use(require('./' + fileName));
  }
});

app.set('views', __dirname + '/../templatesCommon/');
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
