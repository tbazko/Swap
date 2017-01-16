"use strict";
const express = require('express');
const ItemListPresenter = rootRequire('app/itemList/ItemListPresenter');
let app = express();

app.get('/', makeItemListPresenter);
app.get('/tag/:id/', makeItemListPresenterFilteredByTag);

function makeItemListPresenter(req, res, next) {
  app.set('views', __dirname + '/../itemList/');
  let i = new ItemListPresenter(rootRequire('app/itemList/strategies/default'));
  i.handle(req, res, next);
}

function makeItemListPresenterFilteredByTag(req, res, next) {
  app.set('views', __dirname + '/../itemList/');
  let i = new ItemListPresenter(rootRequire('app/itemList/strategies/filteredByTag'));
  i.handle(req, res, next);
}

module.exports = app;
