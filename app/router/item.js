'use strict';
const express = require('express');
const ItemPage = rootRequire('app/pages/item/ItemPagePresenter');
const ItemFormPage = rootRequire('app/pages/itemForm/ItemFormPagePresenter');
const DestroyButtonPresenter = rootRequire('app/destroyButton/DestroyButtonPresenter');
const helpers = require('../helpers/index');
let app = express();

app.set('views', __dirname + '/../templatesCommon');
app.get('/item/:id(\\d+)/', makeItemPage);
app.get('/item/create', helpers.signInRedirect, makeItemFormPage);
app.get('/item/:id(\\d+)/edit', helpers.signInRedirect, makeItemFormPage);

app.post('/item/create', helpers.signInRedirect, makeItemFormPage);
app.post('/item/:id(\\d+)/edit', helpers.signInRedirect, makeItemFormPage);
app.post('/item/:id(\\d+)/destroy', helpers.signInRedirect, makeDestroyButton);

function makeDestroyButton(req, res, next) {
  let d = new DestroyButtonPresenter();
  d.destroy(req, res, next);
}

function makeItemPage(req, res, next) {
  let p = new ItemPage({
    template: 'pages/itemView'
  });
  p.render(req, res, next);
}

function makeItemFormPage(req, res, next) {
  let p = new ItemFormPage({
    template: 'pages/itemFormView'
  });
  p.render(req, res, next);
}

module.exports = app;
