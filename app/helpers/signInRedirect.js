module.exports = function(req, res, next) {
  if(!req.isAuthenticated()) {
   if(req.cookies.logged) {
     res.clearCookie('logged');
   }
   res.redirect('/account/signin');
  } else if(req.cookies.logged === undefined) {
   res.redirect('/account/signout');
  } else {
    return next();
  }
};
