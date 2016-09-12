"use strict";

class BaseCollection {
  constructor(collection) {
    this.collection = collection;
  }

  // getAll(callback) {
  //   this.model
  //     .query()
  //     .then(function(products) {
  //       callback(false, products);
  //     })
  //     .catch(function (err) {
  //       callback(true, err);
  //     });
  // }
  //
  // convertToJson() {
  //   getAll(function(error, response) {
  //     let json = response.toJSON();
  //     callback(error, json);
  //   });
  // }
}

module.exports = BaseCollection
