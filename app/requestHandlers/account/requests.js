var events = require('events');
var eventEmitter = new events.EventEmitter();
var User = require('../../models/models').userModel;
var SwapRequest = require('../../models/models').swapRequestModel;

var render = function(req, res, next) {
  var user = req.user;

  User
    .forge({id: user.get('id')})
    .fetch({withRelated: ['newSwapRequests', 'swapRequestsIncoming', 'swapRequestsOutgoing']})
    .then(function(currUser) {
      var newRequests = currUser.related('newSwapRequests');
      var swapRequestsIncoming = currUser.related('swapRequestsIncoming');
      var request;
      var requests = [];

      eventEmitter.on('requestCreated', function(request) {
        requests.push(request);

        if(requests.length === swapRequestsIncoming.length) {
          res.render('account/requests/requestsOverview', {user: user.toJSON(), requests: requests});
        }
      });

      swapRequestsIncoming.forEach(function(model, key) {


        model.fetch({withRelated: ['masterProducts', 'slaveProducts']}).then(function(swapRequest) {
          var masterProducts = swapRequest.related('masterProducts');
          var slaveProducts = swapRequest.related('slaveProducts');

          request = {
            id: model.get('id'),
            buyer_id: model.get('buyer_id'),
            seller_id: model.get('seller_id'),
            email: model.get('email'),
            phone: model.get('phone'),
            message: model.get('message'),
            masterProducts: masterProducts.serialize(),
            slaveProducts: slaveProducts.serialize()
          }

          eventEmitter.emit('requestCreated', request);
        });
      });
    });
}

var renderOne = function(req, res, next) {
  var requestId = req.params.id;
  var url = req.baseUrl + req.path;
  SwapRequest.forge({id: requestId})
    .fetch({withRelated: ['masterProducts', 'slaveProducts']})
    .then(function(swapRequest) {
      res.render('account/requests/requestOne', {request: swapRequest.serialize(), url: url});
    });
}

var postMessage = function(req, res, next) {
  console.log(req.body);
}

module.exports.render = render;
module.exports.renderOne = renderOne;
module.exports.postMessage = postMessage;
