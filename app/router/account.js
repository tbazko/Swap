'use strict';
const express = require('express');
const AccountPresenter = rootRequire('app/account/AccountPresenter')
let app = express();
let redirects = {
  successRedirect: '/user/profile',
  failureRedirect: '/account/signin'
}
app.set('views', __dirname + '/../templatesCommon');
app.get('/account/signin', accountSignIn);
app.get('/account/signout', accountSignOut);
app.get('/account/signup', accountSignUp);
app.get('/account/forgot-password', accountForgotPasswordPage);

app.post('/account/signin', accountSignIn);
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
  a.redirects = redirects;
  a.signOut(req, res, next);
}

function accountSignUp(req, res, next) {
  app.set('views', __dirname + '/../account/');
  let a = new AccountPresenter('signUpFormView');
  a.redirects = redirects;
  a.signUp(req, res, next);
}

function accountForgotPasswordPage(req, res, next) {
  res.render('pages/forgotPasswordView');
}

module.exports = app;
