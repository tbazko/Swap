"use strict";
const express = require('express');
const ItemListPresenter = rootRequire('app/itemList/ItemListPresenter');
const helpers = require('../helpers/index');
let app = express();

app.get('/user/items', helpers.signInRedirect, makeItemListPresenter);
app.post('/user/items', helpers.isAuthenticated, makeItemListPresenter);

function makeItemListPresenter(req, res, next) {
  app.set('views', __dirname + '/../itemList/');
  let itemList = new ItemListPresenter(rootRequire('app/itemList/strategies/filteredByUser'));
  itemList.handle(req, res, next);
}

module.exports = app;
