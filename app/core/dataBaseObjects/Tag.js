"use strict";
const Base = require('./Base');
const DataBaseTag = require('../dataBaseSchemas/Tag');

class Tag extends Base {
  constructor() {
    super(DataBaseTag);
  }

  loadRelatedItemsWithRelations(tagName, relations, callback) {
    this.DataBaseSchema
      .query()
      .where('name', '=', tagName)
      // .first()
      .eager(relations)
      .then(function(tag) {
        callback(null, tag[0].items);
      })
      .catch(function(err) {
        callback(true, err);
      });
  }
}

module.exports = Tag;
