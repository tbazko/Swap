var ProductModel = require('../models/models').productModel;
var UserModel = require('../models/models').userModel;
var ProductCollection = require('../models/models').productCollection;
var cloudinary = require('../../config/cloudinary');

var openDetailsPage = function(req, res, next) {
  var productId = req.params.id;

  ProductModel.forge({productId: productId})
    .fetch({withRelated: ['images']})
    .then(function(model) {
      if(model) {
        model.set({shortDescription: model.get('description').slice(0, 60)});
        model.related('images').each(function(model, key) {
          var image = cloudinary.image(model.get('imageId') + '.jpg', {alt: model.imageId, height: 440});
          var thumbnail = cloudinary.image(model.get('imageId') + '.jpg', {alt: model.imageId, height: 100, width: 100, crop: 'fill', gravity: 'center'});
          model.set({image: image, thumbnail: thumbnail});
        });

        var product = model;
        var userId = model.get('userId');

        UserModel.forge({userId: userId})
        .fetch({withRelated: ['products'], debug: true})
        .then(function(model) {
          var user = model;
          res.render('product', { product: product.serialize(), author: user.serialize() });
        });
      } else {
        res.redirect('/');
        res.end();
      }
    });
}

module.exports.openDetailsPage = openDetailsPage;
