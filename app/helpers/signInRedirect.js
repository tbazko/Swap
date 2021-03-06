module.exports = function(req, res, next) {
  if(!req.isAuthenticated()) {
   if(req.cookies.logged) {
     res.clearCookie('logged');
   }
   req.session.lastOpenedUrl = req.originalUrl ? req.originalUrl : null;
   res.redirect('/account/signin');
  } else if(req.cookies.logged === undefined) {
   res.redirect('/account/signout');
  } else {
    return next();
  }
};
