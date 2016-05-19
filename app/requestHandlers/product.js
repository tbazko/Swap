var events = require('events');
var eventEmitter = new events.EventEmitter();
var Model = require('../models/models');
var Product = Model.productModel;
var User = Model.userModel;
var SwapRequest = Model.swapRequestModel;
var cloudinary = require('../../config/cloudinary');
var jade = require('jade');
var notifyUser = require('./user').swapNotification;

var openDetailsPage = function(req, res, next) {
  var productId = req.params.id;

  Product.forge({id: productId})
    .fetch({withRelated: ['images', 'tags', 'swapForTags']})
    .then(function(model) {
      if(model) {

        model.set({shortDescription: model.get('description').slice(0, 60)});
        model.related('images').each(function(model, key) {
          var image = cloudinary.image(model.get('id') + '.jpg', {alt: model.get('id'), height: 440});
          var thumbnail = cloudinary.image(model.get('id') + '.jpg', {alt: model.get('id'), height: 100, width: 100, crop: 'fill', gravity: 'center'});
          model.set({image: image, thumbnail: thumbnail});
        });

        var product = model;
        var userId = model.get('user_id');

        User.forge({id: userId})
        .fetch({withRelated: ['products']})
        .then(function(model) {
          var user = model;

          res.render('product', { product: product.serialize(), author: user.serialize()});
        });
      } else {
        res.redirect('/');
        res.end();
      }
    });
}

var productSwapRequest = function(req, res, next) {
  var swapForm = req.body;
  var userId = req.user.id;
  var masterProductId = req.params.id;
  var slaveProductIds = [];
  slaveProductIds = swapForm['productId[]'];
  var newSwapRequest = new SwapRequest({
    seller_id: swapForm.authorId,
    buyer_id: userId,
    email: swapForm.email,
    phone: swapForm.phone,
    message: swapForm.message
  });

  eventEmitter.once('swapRequestCreated', function(swapRequest) {
    console.log('event caught, swap request details:');
    notifyUser(swapRequest);
  });

  newSwapRequest.save().then(function(swapRequest) {
    swapRequest.masterProducts().attach(masterProductId);
    swapRequest.slaveProducts().attach(slaveProductIds);

    eventEmitter.emit('swapRequestCreated', swapRequest);
    res.send({ data: true });
  });
}

module.exports.openDetailsPage = openDetailsPage;
module.exports.swapRequest = productSwapRequest;
