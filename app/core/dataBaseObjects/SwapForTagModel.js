"use strict";
const Model = require('../../../config/database').Model;

class SwapForTagModel extends Model {
  static get tableName() {
    return 'tags';
  }

  static get relationMappings() {
    return {
      products: {
        relation: Model.ManyToManyRelation,
        modelClass: __dirname + '/Product',
        join: {
          from: 'tags.id',
          through: {
            from: 'products_swapForTags.tag_id',
            to: 'products_swapForTags.product_id'
          },
          to: 'products.id'
        }
      }
    }
  }
}

module.exports = SwapForTagModel;
