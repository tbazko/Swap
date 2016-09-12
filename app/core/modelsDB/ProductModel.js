"use strict";
const Model = require('../../../config/database').Model;


class ProductModel extends Model {
  static get tableName() {
    return 'products';
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: __dirname + '/userModel',
        join: {
          from: 'products.user_id',
          to: 'users.id'
        }
      },
      images: {
        relation: Model.HasManyRelation,
        modelClass: __dirname + '/ProductImageModel',
        join: {
          from: 'products.id',
          to: 'productImages.product_id'
        }
      },
      tags: {
        relation: Model.ManyToManyRelation,
        modelClass: __dirname + '/TagModel',
        join: {
          from: 'products.id',
          through: {
            from: 'products_tags.product_id',
            to: 'products_tags.tag_id'
          },
          to: 'tags.id'
        }
      },
      swapForTags: {
        relation: Model.ManyToManyRelation,
        modelClass: __dirname + '/TagModel',
        join: {
          from: 'products.id',
          through: {
            from: 'products_swapForTags.product_id',
            to: 'products_swapForTags.tag_id'
          },
          to: 'tags.id'
        }
      },
      swapRequestsAsMaster: {
        relation: Model.ManyToManyRelation,
        modelClass: __dirname + '/SwapRequestModel',
        join: {
          from: 'products.id',
          through: {
            from: 'masterProducts_swapRequests.product_id',
            to: 'masterProducts_swapRequests.request_id'
          },
          to: 'swapRequests.id'
        }
      },
      swapRequestsAsSlave: {
        relation: Model.ManyToManyRelation,
        modelClass: __dirname + '/SwapRequestModel',
        join: {
          from: 'products.id',
          through: {
            from: 'slaveProducts_swapRequests.product_id',
            to: 'slaveProducts_swapRequests.request_id'
          },
          to: 'swapRequests.id'
        }
      }
    }
  }
}

module.exports = ProductModel;
