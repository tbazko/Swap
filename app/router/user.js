"use strict";
const express = require('express');
const ItemListPresenter = rootRequire('app/itemList/ItemListPresenter');
const UserProfilePresenter = rootRequire('app/userProfile/UserProfilePresenter');
const helpers = require('../helpers/index');
let app = express();

app.get('/user/items', helpers.signInRedirect, makeItemListPresenter);
app.get('/user/profile', helpers.signInRedirect, makeUserProfile);
app.post('/user/items', helpers.isAuthenticated, makeItemListPresenter);

function makeItemListPresenter(req, res, next) {
  app.set('views', __dirname + '/../itemList/');
  let itemList = new ItemListPresenter(rootRequire('app/itemList/strategies/filteredByUser'));
  itemList.handle(req, res, next);
}

function makeUserProfile(req, res, next) {
  app.set('views', __dirname + '/../userProfile/');
  let userProfile = new UserProfilePresenter();
  userProfile.handle(req, res, next);
}

module.exports = app;
