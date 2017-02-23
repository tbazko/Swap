"use strict";
const Base = require('./Base');
const DataBaseTag = require('../dataBaseSchemas/Tag');

class Tag extends Base {
  constructor() {
    super(DataBaseTag);
  }

  getRelatedActiveItems(id, callback) {
    this.DataBaseSchema
      .query()
      .where(this.idName, id)
      .eager('[items(onlyActive).[images, swapForTags, tags]]', {
        onlyActive: function(builder) {
          builder.where('status', 'for_sale');
        }
      })
      .then(function(items) {
        callback(null, items);
      })
      .catch(function (err) {
        callback(true, err);
      });
  }

  searchPromise(str) {
    return this.DataBaseSchema
      .query()
      .where('name', 'like', '%' + str + '%');
  }
}

module.exports = Tag;
