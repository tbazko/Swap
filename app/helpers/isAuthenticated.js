module.exports = function(req, res, next) {
   if(!req.isAuthenticated()) {
     if(req.cookies.logged) {
       res.clearCookie('logged');
     }
     console.log(req);
    req.session.lastOpenedUrl = req.header('Referer');
    res.send({redirect: '/account/signin'});
   } else {
      return next();
   }
};
