var events = require('events');
var eventEmitter = new events.EventEmitter();
var User = require('../../core/modelsDB/UserModel');
var SwapRequest = require('../../core/modelsDB/SwapRequestModel');
// var SwapRequests = require('../../core/collections/swapRequestCollection');
var Message = require('../../core/modelsDB/MessageModel');

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
