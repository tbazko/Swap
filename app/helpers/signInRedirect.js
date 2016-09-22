module.exports = function(req, res, next) {
   if(!req.isAuthenticated()) {
      res.redirect('/account/signin');
   } else {
      return next();
   }
};
