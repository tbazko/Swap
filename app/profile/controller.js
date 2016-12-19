"use strict";
const User = require('../core/dataBaseObjects/User');

var profile = function(req, res, next) {
   if(!req.isAuthenticated()) {
      res.redirect('/account/signin');
   } else {
      var user = req.user;
      let userModel = new User();

      userModel.getWithRelations(user.id, 'newSwapRequests', function(err, currUser) {
        res.render('profile', {user: currUser[0], newRequests: currUser[0].newSwapRequests.length});
      });
   }
};

module.exports.profile = profile;
