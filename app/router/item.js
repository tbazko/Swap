"use strict";
const express = require('express');
const ItemPresenter = rootRequire('app/item/ItemPresenter');
const ItemFormPresenter = rootRequire('app/itemForm/ItemFormPresenter');
const DestroyButtonPresenter = rootRequire('app/destroyButton/DestroyButtonPresenter');
const helpers = require('../helpers/index');
let app = express();
let itemFormPresenter;
let itemFormMediator;

app.get('/item/:id(\\d+)/', makeItemPresenter);
app.get('/item/create', helpers.signInRedirect, makeItemFormPresenter);
app.get('/item/:id(\\d+)/edit', helpers.signInRedirect, makeItemFormPresenter);

app.post('/item/create', helpers.signInRedirect, makeItemFormPresenter);
app.post('/item/:id(\\d+)/edit', helpers.signInRedirect, makeItemFormPresenter);
app.post('/item/:id(\\d+)/destroy', helpers.signInRedirect, makeDestroyButton);

function makeDestroyButton(req, res, next) {
  let destroyButton = new DestroyButtonPresenter();
  destroyButton.destroy(req, res, next);
}

function makeItemPresenter(req, res, next) {
  app.set('views', __dirname + '/../item/');
  let itemPresenter = new ItemPresenter();
  itemPresenter.handle(req, res, next);
}

function makeItemFormPresenter(req, res, next) {
  app.set('views', __dirname + '/../itemForm/');
  if(!itemFormPresenter) {
    itemFormPresenter = new ItemFormPresenter();
  }
  itemFormPresenter.handle(req, res, next);
}


// app.get('/item/:id', controller.render);
// app.get('/item-create', helpers.signInRedirect, controller.renderForm);
// app.post('/item-destroy', controller.destroy);
// app.post('/item-edit', helpers.signInRedirect, controller.renderForm);
// app.post('/item-create', controller.create);


module.exports = app;
