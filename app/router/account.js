'use strict';
const express = require('express');
const SignInPage = rootRequire('app/pages/signIn/presenter');
const SignUpPage = rootRequire('app/pages/signUp/presenter');
const ResetPasswordPage = rootRequire('app/pages/resetPassword/presenter');
const Authentication = rootRequire('app/authentication/Authentication');
const ResetPassword = rootRequire('app/authentication/ResetPassword');
const ResetPasswordRequest = rootRequire('app/authentication/ResetPasswordRequest');

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
app.get('/reset/:token', makeResetPasswordPage);

app.post('/account/signin', makeSignInPage);
app.post('/account/signup', makeSignUpPage);
app.post('/reset-password', resetPasswordRequest);
app.post('/reset/:token', resetPassword);

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

function resetPassword(req, res, next) {
  let r = new ResetPassword(req, res);
  r.reset();
}

function makeResetPasswordPage(req, res, next) {
  let p = new ResetPasswordPage({
    template: 'pages/resetPasswordView'
  })
  p.render(req, res, next);
}

function resetPasswordRequest(req, res, next) {
  let r = new ResetPasswordRequest(req, res, next);
  r.requestReset();
}

module.exports = app;
