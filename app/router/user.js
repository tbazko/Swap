"use strict";
const express = require('express');
const ItemList = rootRequire('app/itemList/ItemList');
const UserProfilePagePresenter = rootRequire('app/pages/userProfile/UserProfilePagePresenter');
const helpers = require('../helpers/index');
let app = express();
app.set('views', __dirname + '/../pages/templates');
app.get('/user/:id(\\d+)/', makePublicUserProfilePage);
app.get('/user/:id(\\d+)/items', makePublicUserProfilePage);
app.get('/user/items', helpers.signInRedirect, makePublicUserProfilePage);
app.get('/user/profile', helpers.signInRedirect, makePublicUserProfilePage);
app.post('/user/items', helpers.isAuthenticated, makeItemList);

function makePublicUserProfilePage(req, res, next) {
  let p = new UserProfilePagePresenter({
    template: 'userProfileView',
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
