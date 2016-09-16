"use strict";
const Base = require('./Base');
const DataBaseProduct = require('../dataBaseObjects/Product');
const cloudinary = require('../../../config/cloudinary');

class Product extends Base {
  constructor(id) {
    super(DataBaseProduct);
    this.idName = 'id';
  }

  destroy(id, callback) {
    console.log(id);
    this.DataBaseObject
      .query()
      .where(this.identifier, '=', id)
      .first()
      .then(function(product) {
        var imagesPromise = product.$relatedQuery('images');

        // return imagesPromise.then(function(images) {
        //   images.forEach(function(image) {
        //     cloudinary.uploader.destroy(image.id);
        //   });
        // });

        imagesPromise.delete();
        product
          .$relatedQuery('[tags, swapForTags, swapRequestsAsMaster, swapRequestsAsSlave]')
          .unrelate()
          .then(function(resp) {
          console.log(resp);
          console.log('product deleted');
        });

        callback(false);
      })
      .catch(function(err) {
        callback(err);
      });


    // ProductModel.forge({id: req.body.productId})
    //   .fetch({withRelated: ['images']}).then(function(product) {
    //     var images = product.related('images');
    //     images.each(function(image) {
    //       cloudinary.uploader.destroy(image.get('id'));
    //       image.destroy();
    //     });
    //
    //     product.tags().detach();
    //     product.swapForTags().detach();
    //     product.swapRequestsAsMaster().detach();
    //     product.swapRequestsAsSlave().detach();
    //     product.destroy().then(function() {
    //       res.redirect('/account/my-items');
    //     });
    //
    //   }).catch(function (err) {
    //     console.log(err);
    //   });
  }

  getActive(callback) {
    this.DataBaseObject
      .query()
      .whereIn('state', ['FOR_SALE', 'PENDING'])
      .then(function(products) {
        callback(null, products);
      })
      .catch(function (err) {
        callback(true, err);
      });
  }

  getActiveWithRelations(relations, callback) {
    this.getActive(function(err, products) {
      this.DataBaseObject
        .loadRelated(products, relations)
        .then(function(productsWithRelations) {
          callback(null, productsWithRelations);
        })
        .catch(function (err) {
          callback(true, err);
        });
    }.bind(this));
  }
}

module.exports = Product;
