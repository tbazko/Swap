module.exports = function(req, res, next) {
   if(!req.isAuthenticated()) {
     if(req.cookies.logged) {
       res.clearCookie('logged');
     }
    req.session.lastOpenedUrl = req.header('Referer') ? req.header('Referer') : null;
    res.send({redirect: '/account/signin'});
   } else {
      return next();
   }
};
