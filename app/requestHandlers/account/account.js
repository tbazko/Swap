"use strict";
var passport = require('passport');
var bcrypt = require('bcrypt-nodejs');
const User = require('../../core/models/User');

// index
var profile = function(req, res, next) {
   if(!req.isAuthenticated()) {
      res.redirect('/account/signin');
   } else {
      var user = req.user;
      let userModel = new User();

      userModel.getWithRelations(user.id, 'newSwapRequests', function(err, currUser) {
        res.render('account/profile', {user: currUser[0], newRequests: currUser[0].newSwapRequests.length});
      });
   }
};

var isAuthenticated = function(req, res, next) {
   if(!req.isAuthenticated()) {
      res.send(false);
   } else {
      return next();
   }
};

var signInRedirect = function(req, res, next) {
   if(!req.isAuthenticated()) {
      res.render('account/signin', {title: 'Sign In'});
   } else {
      return next();
   }
};


// sign in
// GET
var signIn = function(req, res, next) {
  if(req.isAuthenticated()) {
    res.redirect('/account/profile');
  } else {
   res.render('account/signin', {title: 'Sign In'});
  }
};

// sign in
// POST
var signInPost = function(req, res, next) {

   passport.authenticate('local', {successRedirect: '/account/profile', failureRedirect: '/account/signin'},
   function(err, user, info) {
      if(err) {
        console.log(err.message);
        return res.render('account/signin', {title: 'Sign In', errorMessage: err.message});
      }

      if(!user) {
        console.log(info.message);
        return res.render('account/signin', {title: 'Sign In', errorMessage: info.message});
      }
      return req.logIn(user, function(err) {
         if(err) {
            console.log(err.message);
            return res.render('account/signin', {title: 'Sign In', errorMessage: err.message});
         } else {
            return res.redirect('/account/profile');
         }
      });
   })(req, res, next);
};

// sign up
// GET
var signUp = function(req, res, next) {
   if(req.isAuthenticated()) {
      res.redirect('/account/profile');
   } else {
      res.render('account/signup', {title: 'Sign Up'});
   }
};

// sign up
// POST
let signUpPost = function(req, res, next) {
   let userData = req.body;
   let usernamePromise = null;
   let user = new User(req);
   user.identifier = 'email';

   user.getOneByIdentifier(userData.username, function(err, model) {
      if(model) {
         res.render('account/signup', {title: 'signup', errorMessage: 'username already exists'});
      } else {
         //****************************************************//
         // MORE VALIDATION GOES HERE(E.G. PASSWORD VALIDATION)
         //****************************************************//
         userData.hash = bcrypt.hashSync(userData.password);
         user.createAndFetch(userData, function(err, user) {
           // sign in the newly registered user
           signInPost(req, res, next);
         });
      }
   });
};

// sign out
var signOut = function(req, res, next) {
   if(!req.isAuthenticated()) {
      notFound404(req, res, next);
   } else {
      req.logout();
      res.redirect('/account/signin');
   }
};

// 404 not found
var notFound404 = function(req, res, next) {
   res.status(404);
   res.render('404', {title: '404 Not Found'});
};

// export functions
/**************************************/
// profile
module.exports.profile = profile;
module.exports.isAuthenticated = isAuthenticated;
module.exports.signInRedirect = signInRedirect;

// sigin in
module.exports.signIn = signIn;
module.exports.signInPost = signInPost;

// sign up
module.exports.signUp = signUp;
module.exports.signUpPost = signUpPost;

// sign out
module.exports.signOut = signOut;

// 404 not found
module.exports.notFound404 = notFound404;