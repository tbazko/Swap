var events = require('events');
var eventEmitter = new events.EventEmitter();
var User = require('../core/dataBaseObjects/User');

var loadInfo = function(req, res, next) {
  var userId = req.params.id;
  User
    .query()
    .where('id', '=', userId)
    .then(function(model) {
      res.render('user', { user: model });
    });
}

var swapNotification = function(swapRequest) {
  var userId = swapRequest.get('seller_id');
  var swapId = swapRequest.get('id');
  User
    .query()
    .where('id', '=', userId)
    .eager('[newSwapRequests]')
    .then(function(user) {
    var newSwapRequest = user.related('newSwapRequests');
      // console.log(newSwapRequest.length);
    });
}

module.exports.loadInfo = loadInfo;
module.exports.swapNotification = swapNotification;
