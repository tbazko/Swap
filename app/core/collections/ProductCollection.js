"use strict";
let ProductModel = require('../models/ProductModel');
let BaseCollection = require('./BaseCollection');

class ProductCollection extends BaseCollection {
  // getActive(callback) {
  //   this.model
  //     .query()
  //     .whereIn('state', ['FOR_SALE', 'PENDING'])
  //     .then(function(products) {
  //       callback(false, products);
  //     })
  //     .catch(function (err) {
  //       callback(true, err);
  //     });
  // }

  getActiveWithRelations(relations, callback) {
    this.collection
      .loadRelated(products, relations)
      .then(function(productsWithRelations) {
        callback(false, productsWithRelations);
      })
      .catch(function (err) {
        callback(true, err);
      });
  }
}

module.exports = ProductCollection;
