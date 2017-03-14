"use strict";
const express = require('express');
const ItemList = rootRequire('app/itemList/ItemList');
const CurrentUrl = rootRequire('app/CurrentUrl');
const UserProfilePage = rootRequire('app/pages/userProfile/UserProfilePagePresenter');
const UserProfileEditPage = rootRequire('app/pages/userProfileEdit/presenter');
const helpers = require('../helpers/index');
let app = express();

app.set('views', __dirname + '/../templatesCommon');
app.get('/user/:userId(\\d+)/', makeUserProfilePage);
app.get('/user/:userId(\\d+)/items-list', makeUserProfilePage);
app.get('/user/profile', helpers.signInRedirect, makeCurrentUserProfilePage);
app.get('/user/profile/items', helpers.signInRedirect, makeCurrentUserProfilePage);
app.get('/user/profile/edit', helpers.signInRedirect, makeUserProfileEditPage);

app.all('/user/:userId(\\d+)/items', makeUserItemList);
app.all('/user/items', helpers.isAuthenticated, makeCurrentUserItemList);
app.post('/user/profile/edit', helpers.signInRedirect, makeUserProfileEditPage);

function makeCurrentUserProfilePage(req, res, next) {
  let p = new UserProfilePage({
    template: 'pages/userProfileView',
    itemListStrategy: 'filteredByCurrentUser'
  });
  p.render(req, res, next);
}

function makeUserProfilePage(req, res, next) {
  let p = new UserProfilePage({
    template: 'pages/userProfileView',
    itemListStrategy: 'filteredByUser'
  });
  p.render(req, res, next);
}

function makeUserProfileEditPage(req, res, next) {
  let p = new UserProfileEditPage({
    template: 'pages/userProfileEditView',
    itemListStrategy: 'filteredByUser'
  });
  p.render(req, res, next);
}

function makeUserItemList(req, res, next) {
  req.itemListStrategy = 'filteredByUser';
  req.userId = req.params.userId;
  _makeItemList(req, res, next).then((data) => res.send(data));
}

function makeCurrentUserItemList(req, res, next) {
  req.itemListStrategy = 'filteredByCurrentUser';
  req.userId = req.user.id;
  _makeItemList(req, res, next).then((data) => {
    data.isCurrentUserProfile = true;
    res.send(data)
  });
}

function _makeItemList(req, res, next) {
  let i = new ItemList(req);
  let u = new CurrentUrl(req);
  let listResponse;
  return i.responseDataPromise.then((response) => {
    listResponse = response;
    return u.responseDataPromise;
  }).then((urlResponse) => {
    var formattedData = helpers.arrayToObject([listResponse, urlResponse]);
    return formattedData;
  });
}

module.exports = app;
