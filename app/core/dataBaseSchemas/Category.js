"use strict";
const DataBaseSchema = rootRequire('config/database').Model;

class Category extends DataBaseSchema {
  static get tableName() {
    return 'categories';
  }

  static get relationMappings() {
    return {
      items: {
        relation: DataBaseSchema.HasManyRelation,
        modelClass: __dirname + '/Item',
        join: {
          from: 'categories.id',
          to: 'items.category_id'
        }
      },
    }
  }
}

module.exports = Category;
