var UserModel = require('../models/models').userModel;

var loadInfo = function(req, res, next) {
  var userId = req.params.id;
  UserModel.forge()
  .fetch({UserId: userId})
  .then(function(model) {
    res.render('user', { user: model.serialize() });
  });
}

module.exports.loadInfo = loadInfo;
