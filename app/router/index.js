"use strict";
const express = require('express');
const app = express();
const path = require('path');
const fs  = require('fs');
let routerFiles = fs.readdirSync(__dirname);

routerFiles.forEach((file) => {
  if(file != 'index.js') {
    let regex = /\.js$/gi;
    let fileName = file.replace(regex, '');
    app.use(require('./' + fileName));
  }
});

module.exports = app;
