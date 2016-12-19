"use strict";
const events = require('events');
const SwapRequest = require('../core/dataBaseObjects/SwapRequest');

let renderOverview = function(req, res, next) {
  let user = req.user;
  let userId = user.id;
  let swapRequest = new SwapRequest();
  swapRequest.identifier = ['buyer_id', 'seller_id'];

  swapRequest
    .getWithRelations(userId, '[masterItems, slaveItems, seller, buyer]', function(err, requests) {
      res.render('requestsOverview', {user: user, requests: requests});
    });
}

let renderOne = function(req, res, next) {
  let user = req.user;
  let requestId = req.params.id;
  let url = req.baseUrl + req.path;
  let swapRequest = new SwapRequest();

  swapRequest
    .getWithRelationsAndFilteredMessages(
      requestId,
      function(err, requests) {
      res.render('requestOne', {request: requests[0], user: user, url: url});
    });
}

let create = function(req, res, next) {
  let newSwapRequest = new SwapRequest();
  newSwapRequest.create(req);
  res.send({ data: true });
}

module.exports.renderOverview = renderOverview;
module.exports.renderOne = renderOne;
module.exports.create = create;
