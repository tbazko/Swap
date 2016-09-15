"use strict";
const DataBaseObject = require('../../../config/database').Model;

class Tag extends DataBaseObject {
  static get tableName() {
    return 'tags';
  }

  static get relationMappings() {
    return {
      products: {
        relation: DataBaseObject.ManyToManyRelation,
        modelClass: __dirname + '/Product',
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

module.exports = Tag;
