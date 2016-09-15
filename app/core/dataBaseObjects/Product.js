"use strict";
const DataBaseObject = require('../../../config/database').Model;

class Product extends DataBaseObject {
  static get tableName() {
    return 'products';
  }

  static get relationMappings() {
    return {
      user: {
        relation: DataBaseObject.BelongsToOneRelation,
        modelClass: __dirname + '/User',
        join: {
          from: 'products.user_id',
          to: 'users.id'
        }
      },
      images: {
        relation: DataBaseObject.HasManyRelation,
        modelClass: __dirname + '/ProductImageModel',
        join: {
          from: 'products.id',
          to: 'productImages.product_id'
        }
      },
      tags: {
        relation: DataBaseObject.ManyToManyRelation,
        modelClass: __dirname + '/Tag',
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
        relation: DataBaseObject.ManyToManyRelation,
        modelClass: __dirname + '/Tag',
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
        relation: DataBaseObject.ManyToManyRelation,
        modelClass: __dirname + '/SwapRequest',
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
        relation: DataBaseObject.ManyToManyRelation,
        modelClass: __dirname + '/SwapRequest',
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

module.exports = Product;
