var Model = require('../models/models');
var Product = Model.productModel;
var User = Model.userModel;
var SwapRequest = Model.swapRequestModel;
var cloudinary = require('../../config/cloudinary');
var jade = require('jade');

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

var swapRequest = function(req, res, next) {
  var swapForm = req.body;
  var newSwapRequest = new SwapRequest({
    // productId: swapForm.productId,
    // userId: swapForm.userId,
    email: swapForm.email,
    phone: swapForm.phone,
    message: swapForm.message
  });
  newSwapRequest.save().then(function(swapRequest) {

  });
}

module.exports.openDetailsPage = openDetailsPage;
module.exports.swapRequest = swapRequest;
