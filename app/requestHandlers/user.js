"use strict";
var events = require('events');
var eventEmitter = new events.EventEmitter();
var User = require('../core/models/User');

var loadInfo = function(req, res, next) {
  let user = new User();

  user
    .getOneByIdentifier(req.params.id, function(err, model) {
      res.render('user', { user: model });
    });
}

var swapNotification = function(swapRequest) {
  var userId = swapRequest.seller_id;
  var swapId = swapRequest.id;
  let user = new User();
  user
    .getWithRelations(userId, 'newSwapRequests', function(err, model) {
      var newSwapRequest = user.related('newSwapRequests');
        // console.log(newSwapRequest.length);
      
    });
}

module.exports.loadInfo = loadInfo;
module.exports.swapNotification = swapNotification;
