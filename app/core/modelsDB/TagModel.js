"use strict";
const Model = require('../../../config/database').Model;

class TagModel extends Model {
  static get tableName() {
    return 'tags';
  }

  static get relationMappings() {
    return {
      products: {
        relation: Model.ManyToManyRelation,
        modelClass: __dirname + '/ProductModel',
        join: {
          from: 'tags.id',
          through: {
            from: 'products_tags.tag_id',
            to: 'products_tags.product_id'
          },
          to: 'products.id'
        }
      }
    }
  }
}

module.exports = TagModel;
