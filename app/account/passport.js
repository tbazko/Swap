"use strict";
var express       = require('express');
var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt        = require('bcrypt-nodejs');
var User          = rootRequire('app/core/dataBaseModels/User');

class UserVerification {
  constructor() {
    this.user = new User();
    this.user.idName = 'email';
  }

  verify(email, password, callback) {
    this.email = email;
    this.password = password;
    this.callback = callback;
    this._getUserFromDataBase();
  }

  _getUserFromDataBase() {
    this.user.getOneByIdentifier(this.email, this._verifyUserCredentials.bind(this));
  }

  _verifyUserCredentials(err, user) {
    if(user === null) {
       return this.callback(null, false, {message: 'Invalid username or password'});
    } else {
       this._verifyPassword(user);
    }
  }

  _verifyPassword(user) {
    if(!user) {
      return this.callback(null, false, {message: 'Invalid username or password'});
    } else if(!bcrypt.compareSync(this.password, user.password)) {
       return this.callback(null, false, {message: 'Invalid username or password'});
    } else {
       return this.callback(null, user);
    }
  }
}

let userVerification = new UserVerification();
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, userVerification.verify.bind(userVerification)));

passport.serializeUser((user, callback) => callback(null, user.email));
passport.deserializeUser(function(username, callback) {
  let user = new User();
  user.idName = 'email';
  user.getOneByIdentifier(username, (err, user) => callback(null, user));
});

module.exports = passport;
