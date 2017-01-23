module.exports = function(req, res, next) {
   if(!req.isAuthenticated()) {
     if(req.cookies.logged) {
       res.clearCookie('logged');
     }
    res.send(false);
   } else {
      return next();
   }
};
