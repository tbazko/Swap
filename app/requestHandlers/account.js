// vendor library
var passport = require('passport');
var bcrypt = require('bcrypt-nodejs');

// custom library
// model
var UserModel = require('../models/models').userModel;

// index
var profile = function(req, res, next) {
   if(!req.isAuthenticated()) {
      res.redirect('/signin');
   } else {
      var user = req.user;

      if(user !== undefined) {
         user = user.toJSON();
      }
      res.render('account/profile', {user: user});
   }
};

var isAuthenticated = function(req, res, next) {
   if(!req.isAuthenticated()) {
      res.redirect('/signin');
   } else {
      return next();
   }
};

// sign in
// GET
var signIn = function(req, res, next) {
  if(req.isAuthenticated()) {
    res.redirect('/profile');
  } else {
   res.render('account/signin', {title: 'Sign In'});
  }
};

// sign in
// POST
var signInPost = function(req, res, next) {

   passport.authenticate('local', {successRedirect: '/profile', failureRedirect: '/signin'},
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
            return res.redirect('/profile');
         }
      });
   })(req, res, next);
};

// sign up
// GET
var signUp = function(req, res, next) {
   if(req.isAuthenticated()) {
      res.redirect('/profile');
   } else {
      res.render('account/signup', {title: 'Sign Up'});
   }
};

// sign up
// POST
var signUpPost = function(req, res, next) {
   var user = req.body;
   var usernamePromise = null;
   usernamePromise = new UserModel({email: user.username}).fetch();

   return usernamePromise.then(function(model) {
      if(model) {
         res.render('account/signup', {title: 'signup', errorMessage: 'username already exists'});
      } else {
         //****************************************************//
         // MORE VALIDATION GOES HERE(E.G. PASSWORD VALIDATION)
         //****************************************************//
         var password = user.password;
         var hash = bcrypt.hashSync(password);

         var signUpUser = new UserModel({
            email: user.username,
            password: hash,
            firstName: 'TamaraTest',
            city: 'Amsterdam',
            country: 'The Netherlands'
        });

         signUpUser.save().then(function(model) {
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
      res.redirect('/signin');
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
