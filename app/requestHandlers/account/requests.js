"use strict";
const SwapRequest = require('../../core/models/SwapRequest');
const Message = require('../../core/models/Message');

let render = function(req, res, next) {
  let user = req.user;
  let userId = user.id;
  let swapRequest = new SwapRequest();
  swapRequest.identifier = 'buyer_id';

  swapRequest
    .getWithRelations(userId, '[masterProducts, slaveProducts, seller, buyer]', function(err, requests) {
      res.render('account/requests/requestsOverview', {user: user, requests: requests});
    });
}

var renderOne = function(req, res, next) {
  let user = req.user;
  let requestId = req.params.id;
  let url = req.baseUrl + req.path;
  let swapRequest = new SwapRequest();

  swapRequest
    .getWithRelations(requestId, '[masterProducts, slaveProducts, seller, buyer, messages]', function(err, requests) {
      res.render('account/requests/requestOne', {request: requests[0], user: user, url: url});
    });
}

var postMessage = function(req, res, next) {
  let newMessage = new Message();
  newMessage.create(req);
}

module.exports.render = render;
module.exports.renderOne = renderOne;
module.exports.postMessage = postMessage;
