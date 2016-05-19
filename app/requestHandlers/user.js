var events = require('events');
var eventEmitter = new events.EventEmitter();
var UserModel = require('../models/models').userModel;

var loadInfo = function(req, res, next) {
  var userId = req.params.id;
  UserModel.forge()
  .fetch({id: userId})
  .then(function(model) {
    res.render('user', { user: model.serialize() });
  });
}

var swapNotification = function(swapRequest) {

  var userId = swapRequest.get('seller_id');
  var swapId = swapRequest.get('id');
  UserModel.forge({id: userId}).fetch({withRelated: ['newSwapRequests']}).then(function(user) {
    var newSwapRequest = user.related('newSwapRequests');
    // console.log(newSwapRequest.length);
  });
}

module.exports.loadInfo = loadInfo;
module.exports.swapNotification = swapNotification;
