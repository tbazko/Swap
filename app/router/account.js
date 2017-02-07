'use strict';
const express = require('express');
const SignInPage = rootRequire('app/pages/signIn/presenter');
const SignUpPage = rootRequire('app/pages/signUp/presenter');
const Authentication = rootRequire('app/authentication/Authentication');
let app = express();
let redirects = {
  successRedirect: '/user/profile',
  failureRedirect: '/account/signin'
}
app.set('views', __dirname + '/../templatesCommon');
app.get('/account/signin', makeSignInPage);
app.get('/account/signout', makeSignOut);
app.get('/account/signup', makeSignUpPage);
app.get('/account/forgot-password', accountForgotPasswordPage);

app.post('/account/signin', makeSignInPage);
app.post('/account/signup', makeSignUpPage);

function makeSignInPage(req, res, next) {
  app.set('views', __dirname + '/../templatesCommon');
  let p = new SignInPage({
    template: 'pages/signInFormView',
    redirects: redirects
  });
  p.render(req, res, next);
}

function makeSignUpPage(req, res, next) {
  app.set('views', __dirname + '/../templatesCommon');
  let p = new SignUpPage({
    template: 'pages/signUpFormView',
    redirects: redirects
  });
  p.render(req, res, next);
}

function makeSignOut(req, res, next) {
  let a = new Authentication();
  a.req = req;
  a.res = res;
  a.redirects = redirects;
  a.signOut();
}

function accountForgotPasswordPage(req, res, next) {
  res.render('pages/forgotPasswordView');
}

module.exports = app;
