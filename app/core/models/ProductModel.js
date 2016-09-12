"use strict";
const BaseModel = require('./BaseModel');
const ProductModelDB = require('../modelsDB/ProductModel');


class ProductModel extends BaseModel {
  constructor() {
    super(ProductModelDB);
  }

  getActive(callback) {
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
      this.model
        .loadRelated(products, relations)
        .then(function(productsWithRelations) {
          callback(false, productsWithRelations);
        })
        .catch(function (err) {
          callback(true, err);
        });
    }.bind(this));
  }
}

module.exports = ProductModel;
