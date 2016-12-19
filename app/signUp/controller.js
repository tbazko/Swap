"use strict";
let bcrypt = require('bcrypt-nodejs');
const User = require('../core/dataBaseObjects/User');
let signInController = require('../signInOut/controller');

// sign up
// GET
let signUp = function(req, res, next) {
   if(req.isAuthenticated()) {
      res.redirect('/account/profile');
   } else {
      res.render('signup', {title: 'Sign Up'});
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
         res.render('signup', {title: 'signup', errorMessage: 'username already exists'});
      } else {
         //****************************************************//
         // MORE VALIDATION GOES HERE(E.G. PASSWORD VALIDATION)
         //****************************************************//
         userData.hash = bcrypt.hashSync(userData.password);
         user.createAndFetch(userData, function(err, user) {
           // sign in the newly registered user
           signInController.signInPost(req, res, next);
         });
      }
   });
};

module.exports.signUp = signUp;
module.exports.signUpPost = signUpPost;
