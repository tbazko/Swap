"use strict";
const express = require('express');
const ItemList = rootRequire('app/itemList/ItemList');
const UserProfilePage = rootRequire('app/pages/userProfile/UserProfilePagePresenter');
const UserProfileEditPage = rootRequire('app/pages/userProfileEdit/presenter');
const helpers = require('../helpers/index');
let app = express();

app.set('views', __dirname + '/../templatesCommon');
app.get('/user/:id(\\d+)/', makeUserProfilePage);
app.get('/user/:id(\\d+)/items', makeUserProfilePage);
app.get('/user/items', helpers.signInRedirect, makeCurrentUserProfilePage);
app.get('/user/profile', helpers.signInRedirect, makeCurrentUserProfilePage);
app.get('/user/profile/edit', helpers.signInRedirect, makeUserProfileEditPage);
app.post('/user/items', helpers.isAuthenticated, makeItemList);
app.post('/user/profile/edit', helpers.signInRedirect, makeUserProfileEditPage);

function makeCurrentUserProfilePage(req, res, next) {
  let p = new UserProfilePage({
    template: 'pages/userProfileView',
    itemListStrategy: rootRequire('app/itemList/strategies/filteredByCurrentUser')
  });
  p.render(req, res, next);
}

function makeUserProfilePage(req, res, next) {
  let p = new UserProfilePage({
    template: 'pages/userProfileView',
    itemListStrategy: rootRequire('app/itemList/strategies/filteredByUser')
  });
  p.render(req, res, next);
}

function makeUserProfileEditPage(req, res, next) {
  let p = new UserProfileEditPage({
    template: 'pages/userProfileEditView',
    itemListStrategy: rootRequire('app/itemList/strategies/filteredByUser')
  });
  p.render(req, res, next);
}

function makeItemList(req, res, next) {
  req.itemListStrategy = rootRequire('app/itemList/strategies/filteredByCurrentUser');
  req.userId = req.user.id;

  let i = new ItemList(req);
  i.responseDataPromise.then((response) => {
    res.send(response);
  });
}

module.exports = app;
