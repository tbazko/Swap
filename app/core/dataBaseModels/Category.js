"use strict";
const Base = require('./Base');
const DataBaseCategory = require('../dataBaseSchemas/Category');

class Category extends Base {
  constructor() {
    super(DataBaseCategory);
  }

  getAllCategories() {
    return this.DataBaseSchema.query();
  }

  getAllParentCategories() {
    return this.DataBaseSchema
      .query()
      .where('parent', null);
  }

  getOneByIdentifier(id) {
    return this.DataBaseSchema
      .query()
      .where(this.idName, '=', id)
      .first();
  }
  // getRelatedActiveItems(id, callback) {
  //   return this.DataBaseSchema
  //     .query()
  //     .where(this.idName, id)
  //     .eager('[items(onlyActive).[images, swapForTags, tags]]', {
  //       onlyActive: function(builder) {
  //         builder.where('status', 'for_sale');
  //       }
  //     });
  // }
}

module.exports = Category;
