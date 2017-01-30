"use strict";
const express = require('express');
const ItemListPresenter = rootRequire('app/itemList/ItemListPresenter');
const CurrentUserProfilePresenter = rootRequire('app/userProfile/current/UserProfilePresenter');
const PublicUserProfilePresenter = rootRequire('app/userProfile/public/UserProfilePresenter');
const helpers = require('../helpers/index');
let app = express();

app.get('/user/:id(\\d+)/', makePublicUserProfile);
app.get('/user/:id(\\d+)/items', makePublicUserProfile);
app.get('/user/items', helpers.signInRedirect, makeCurrentUserProfile);
app.get('/user/profile', helpers.signInRedirect, makeCurrentUserProfile);
app.post('/user/items', helpers.isAuthenticated, makeItemListPresenter);

function makeItemListPresenter(req, res, next) {
  app.set('views', __dirname + '/../itemList/');
  let i = new ItemListPresenter(rootRequire('app/itemList/strategies/filteredByCurrentUser'));
  i.handle(req, res, next);
}

function makeCurrentUserProfile(req, res, next) {
  app.set('views', __dirname + '/../userProfile/current');
  let u = new CurrentUserProfilePresenter();
  u.handle(req, res, next);
}

function makePublicUserProfile(req, res, next) {
  app.set('views', __dirname + '/../userProfile/public');
  let p = new PublicUserProfilePresenter();
  p.handle(req, res, next);
}

module.exports = app;
