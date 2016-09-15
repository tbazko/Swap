"use strict";
const Base = require('./Base');
const DataBaseProduct = require('../dataBaseObjects/Product');

class Product extends Base {
  constructor(id) {
    super(DataBaseProduct);
    this.idName = 'id';
  }

  getActive(callback) {
    this.DataBaseObject
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
      this.DataBaseObject
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

module.exports = Product;
