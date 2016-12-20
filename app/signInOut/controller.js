"use strict";
var passport = require('passport');

// sign in
// GET
var signIn = function(req, res, next) {
  if(req.isAuthenticated()) {
    res.redirect('/user/profile');
  } else {
   res.render('signin', {title: 'Sign In'});
  }
};

// sign in
// POST
var signInPost = function(req, res, next) {
   passport.authenticate('local', {
     successRedirect: '/account/profile',
     failureRedirect: '/account/signin'
   },
   function(err, user, info) {
     console.log(2);
      if(err) {
        console.log(err.message);
        return res.render('signin', {
          title: 'Sign In',
          errorMessage: err.message
        });
      }

      if(!user) {
        console.log(info.message);
        return res.render('signin', {
          title: 'Sign In',
          errorMessage: info.message
        });
      }
      return req.logIn(user, function(err) {
         if(err) {
            console.log(err.message);
            return res.render('signin', {
              title: 'Sign In',
              errorMessage: err.message});
         } else {
            return res.redirect('/user/profile');
         }
      });
   })(req, res, next);
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

module.exports.signIn = signIn;
module.exports.signInPost = signInPost;
module.exports.signOut = signOut;
