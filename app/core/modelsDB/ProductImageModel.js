"use strict";
const Model = require('../../../config/database').Model;

class ProductImageModel extends Model {
  static get tableName() {
    return 'productImages';
  }

  static get relationMappings() {
    return {
      product: {
        relation: Model.BelongsToOneRelation,
        modelClass: __dirname + '/ProductModel',
        join: {
          from: 'productImages.product_id',
          to: 'products.id'
        }
      }
    }
  }
}

module.exports = ProductImageModel;
