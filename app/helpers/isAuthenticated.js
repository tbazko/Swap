module.exports = function(req, res, next) {
   if(!req.isAuthenticated()) {
      res.send(false);
   } else {
      return next();
   }
};
