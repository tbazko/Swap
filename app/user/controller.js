"use strict";
var User = require('../core/dataBaseObjects/User');

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
