var ProductModel = require('../models/models').productModel;
var UserModel = require('../models/models').userModel;
var ProductCollection = require('../models/models').productCollection;

var openDetailsPage = function(req, res, next) {
  var productId = req.params.id;

  ProductModel.forge({ProductId: productId})
    .fetch()
    .then(function(model) {
      if(model) {
        var product = model;

        model.set({ShortDescription: model.get('description').slice(0, 60)});
        var userId = model.get('userId');

        UserModel.forge({UserId: userId})
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
