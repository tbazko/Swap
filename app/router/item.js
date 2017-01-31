'use strict';
const express = require('express');
const ItemPage = rootRequire('app/pages/item/ItemPagePresenter');
const ItemFormPresenter = rootRequire('app/itemForm/ItemFormPresenter');
const DestroyButtonPresenter = rootRequire('app/destroyButton/DestroyButtonPresenter');
const helpers = require('../helpers/index');
let app = express();

app.get('/item/:id(\\d+)/', makeItemPage);
app.get('/item/create', helpers.signInRedirect, makeItemFormPresenter);
app.get('/item/:id(\\d+)/edit', helpers.signInRedirect, makeItemFormPresenter);

app.post('/item/create', helpers.signInRedirect, makeItemFormPresenter);
app.post('/item/:id(\\d+)/edit', helpers.signInRedirect, makeItemFormPresenter);
app.post('/item/:id(\\d+)/destroy', helpers.signInRedirect, makeDestroyButton);

function makeDestroyButton(req, res, next) {
  let d = new DestroyButtonPresenter();
  d.destroy(req, res, next);
}

function makeItemPage(req, res, next) {
  app.set('views', __dirname + '/../pages/templates');
  let p = new ItemPage({
    template: 'itemView'
  });
  p.render(req, res, next);
}

function makeItemFormPresenter(req, res, next) {
  app.set('views', __dirname + '/../itemForm/');
  let i = new ItemFormPresenter();
  i.handle(req, res, next);
}

module.exports = app;
