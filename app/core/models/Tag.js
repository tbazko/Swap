"use strict";
const Base = require('./Base');
const DataBaseTag = require('../dataBaseObjects/Tag');

class Tag extends Base {
  constructor() {
    super(DataBaseTag);
  }

  loadRelatedProductsWithRelations(tagName, relations, callback) {
    this.DataBaseObject
      .query()
      .where('name', '=', tagName)
      .first()
      .eager(relations)
      .then(function(tag) {
        callback(null, tag.products);
      })
      .catch(function(err) {
        callback(true, err);
      });
  }
}

module.exports = Tag;
