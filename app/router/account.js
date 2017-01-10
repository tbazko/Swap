'use strict';
const express = require('express');
const AccountPresenter = rootRequire('app/account/AccountPresenter')
let app = express();
let redirects = {
  successRedirect: '/user/profile',
  failureRedirect: '/account/signin'
}

app.get('/account/signin', accountSignIn);
app.get('/account/signout', accountSignOut);
app.post('/account/signin', accountSignIn);
app.get('/account/signup', accountSignUp);
app.post('/account/signup', accountSignUp);

function accountSignIn(req, res, next) {
  app.set('views', __dirname + '/../account/');
  let a = new AccountPresenter('signInFormView');
  a.redirects = redirects;
  a.signIn(req, res, next);
}

function accountSignOut(req, res, next) {
  app.set('views', __dirname + '/../account/');
  let a = new AccountPresenter('signInFormView');
  a.signOut(req, res, next);
}

function accountSignUp(req, res, next) {
  app.set('views', __dirname + '/../account/');
  let a = new AccountPresenter('signUpFormView');
  a.signUp(req, res, next);
}

module.exports = app;
