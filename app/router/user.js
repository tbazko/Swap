"use strict";
const express = require('express');
const ItemListPresenter = rootRequire('app/itemList/ItemListPresenter');
const UserProfilePresenter = rootRequire('app/userProfile/UserProfilePresenter');
const PublicUserProfilePresenter = rootRequire('app/userProfile/public/UserProfilePresenter');
const helpers = require('../helpers/index');
let app = express();

app.get('/user/:id(\\d+)/', makePublicUserProfile);
app.get('/user/items', helpers.signInRedirect, makeItemListPresenter);
app.get('/user/profile', helpers.signInRedirect, makeUserProfile);
app.post('/user/items', helpers.isAuthenticated, makeItemListPresenter);

function makeItemListPresenter(req, res, next) {
  app.set('views', __dirname + '/../itemList/');
  let i = new ItemListPresenter(rootRequire('app/itemList/strategies/filteredByCurrentUser'));
  i.handle(req, res, next);
}

function makeUserProfile(req, res, next) {
  app.set('views', __dirname + '/../userProfile/');
  let u = new UserProfilePresenter();
  u.handle(req, res, next);
}

function makePublicUserProfile(req, res, next) {
  app.set('views', __dirname + '/../userProfile/public');
  let p = new PublicUserProfilePresenter();
  p.handle(req, res, next);
}

module.exports = app;
