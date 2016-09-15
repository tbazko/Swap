"use strict";
let ProductModel = require('../models/ProductModel');
let BaseCollection = require('./BaseCollection');

class ProductCollection extends BaseCollection {
  getActive(callback) {
    this.collection.forEach(function() {

    })
    this.model
      .query()
      .whereIn('state', ['FOR_SALE', 'PENDING'])
      .then(function(products) {
        callback(false, products);
      })
      .catch(function (err) {
        callback(true, err);
      });
  }

  getActiveWithRelations(relations, callback) {
    this.getActive(function(err, products) {
      ProductModel
        .loadRelated(products, relations)
        .then(function(collectionWithRelations) {
          callback(false, collectionWithRelations);
        })
        .catch(function (err) {
          callback(true, err);
        });
    }.bind(this));
  }
}

module.exports = ProductCollection;
