var events = require('events');
var eventEmitter = new events.EventEmitter();
var User = require('../../models/models').userModel;
var SwapRequest = require('../../models/models').swapRequestModel;
var SwapRequests = require('../../models/models').swapRequestCollection;
var Message = require('../../models/models').messageModel;

var render = function(req, res, next) {
  var user = req.user;
  var userId = user.get('id');
  var users;

  SwapRequests
    .forge({buyer_id: userId})
    .fetch({withRelated: ['masterProducts', 'slaveProducts', 'seller', 'buyer']})
    .then(function(collection) {
      res.render('account/requests/requestsOverview', {user: user.serialize(), requests: collection.serialize()});
    });
}

var renderOne = function(req, res, next) {
  var user = req.user;
  var requestId = req.params.id;
  var url = req.baseUrl + req.path;
  SwapRequest.forge({id: requestId})
    .fetch({withRelated: ['masterProducts', 'slaveProducts', 'messages', 'seller', 'buyer']})
    .then(function(swapRequest) {
      res.render('account/requests/requestOne', {request: swapRequest.serialize(), user: user.serialize(), url: url});
    });
}

var postMessage = function(req, res, next) {
  var messageForm = req.body;
  var userId = req.user.id;
  var requestId = req.params.id;
  console.log(req.body);
  console.log(messageForm.message);
  var newMessage = new Message({
    text: messageForm.message,
    user_id: userId,
    swapRequest_id: requestId
  });

  newMessage.save();
}

module.exports.render = render;
module.exports.renderOne = renderOne;
module.exports.postMessage = postMessage;
