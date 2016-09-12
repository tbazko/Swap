var express       = require('express');
var router        = express.Router();
var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt        = require('bcrypt-nodejs');
var User          = require('../app/core/modelsDB/userModel');

passport.use(new LocalStrategy(function(username, password, done) {
  User
    .query()
    .where('email', '=', username)
    .first()
    .then(function(user) {
      if(user === null) {
         return done(null, false, {message: 'Invalid username or password'});
      } else {
         if(!bcrypt.compareSync(password, user.password)) {
            return done(null, false, {message: 'Invalid username or password'});
         } else {
            return done(null, user);
         }
      }
   });
}));

passport.serializeUser(function(user, done) {
  done(null, user.email);
});

passport.deserializeUser(function(username, done) {
   User
    .query()
    .where('email', '=', username)
    .first()
    .then(function(user) {
      done(null, user);
   });
});

module.exports = passport;
