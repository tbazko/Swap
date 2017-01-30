module.exports = function(req, res, next) {
   if(!req.isAuthenticated()) {
     if(req.cookies.logged) {
       res.clearCookie('logged');
     }
    req.session.lastOpenedUrl = req.header('Referer');
    res.send({redirect: '/account/signin'});
   } else {
      return next();
   }
};
