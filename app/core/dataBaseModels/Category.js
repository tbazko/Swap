"use strict";
const Base = require('./Base');
const DataBaseCategory = require('../dataBaseSchemas/Category');
const Item = require('../dataBaseSchemas/Item');

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

  searchPromise(str) {
    return this.DataBaseSchema
      .query()
      .eager('[items(withTerm), subitems(withTerm)]', {
        withTerm: (builder) => {
          builder.where(function() {
            this.where('name', 'like', `%${str}%`)
            .orWhere('description', 'like', `%${str}%`)
          })
          .andWhere('status', 'for_sale');
        }
      })
      .pick(this.DataBaseSchema, ['id', 'name', 'items', 'subitems'])
      .pick(Item, ['name', 'description'])
  }
}

module.exports = Category;
