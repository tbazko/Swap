'use strict';
const express = require('express');
const ItemPresenter = rootRequire('app/item/ItemPresenter');
const ItemFormPresenter = rootRequire('app/itemForm/ItemFormPresenter');
const DestroyButtonPresenter = rootRequire('app/destroyButton/DestroyButtonPresenter');
const helpers = require('../helpers/index');
let app = express();

app.get('/item/:id(\\d+)/', makeItemPresenter);
app.get('/item/create', helpers.signInRedirect, makeItemFormPresenter);
app.get('/item/:id(\\d+)/edit', helpers.signInRedirect, makeItemFormPresenter);

app.post('/item/create', helpers.signInRedirect, makeItemFormPresenter);
app.post('/item/:id(\\d+)/edit', helpers.signInRedirect, makeItemFormPresenter);
app.post('/item/:id(\\d+)/destroy', helpers.signInRedirect, makeDestroyButton);

function makeDestroyButton(req, res, next) {
  let d = new DestroyButtonPresenter();  
  d.destroy(req, res, next);
}

function makeItemPresenter(req, res, next) {
  app.set('views', __dirname + '/../item/');
  let i = new ItemPresenter();
  i.handle(req, res, next);
}

function makeItemFormPresenter(req, res, next) {
  app.set('views', __dirname + '/../itemForm/');
  let i = new ItemFormPresenter();
  i.handle(req, res, next);
}

module.exports = app;
