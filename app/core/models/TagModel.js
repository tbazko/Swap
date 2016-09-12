"use strict";
const BaseModel = require('./BaseModel');
const TagModelDB = require('../modelsDB/TagModel');

class TagModel extends BaseModel {
  constructor() {
    super(TagModelDB);
  }

  loadRelatedProductsWithRelations(tagName, relations, callback) {
    this.model
      .query()
      .where('name', '=', tagName)
      .first()
      .eager(relations)
      .then(function(tag) {
        callback(tag.products);
      });
  }
}

module.exports = TagModel;
