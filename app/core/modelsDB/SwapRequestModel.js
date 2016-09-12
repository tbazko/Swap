"use strict";
const Model = require('../../../config/database').Model;

class SwapRequestModel extends Model {
  static get tableName() {
    return 'swapRequests';
  }

  static get relationMappings() {
    return {
      messages: {
        relation: Model.HasManyRelation,
        modelClass: __dirname + '/MessageModel',
        join: {
          from: 'users.id',
          to: 'products.user_id'
        }
      },
      seller: {
        relation: Model.BelongsToOneRelation,
        modelClass: __dirname + '/userModel',
        join: {
          from: 'swapRequests.seller_id',
          to: 'users.id'
        }
      },
      swapRequestsIncoming: {
        relation: Model.BelongsToOneRelation,
        modelClass: __dirname + '/userModel',
        join: {
          from: 'swapRequests.buyer_id',
          to: 'users.id'
        }
      },
      swapRequestsOutgoing: {
        relation: Model.HasManyRelation,
        modelClass: __dirname + '/SwapRequestModel',
        join: {
          from: 'users.id',
          to: 'swapRequests.buyer_id'
        }
      },
      masterProducts: {
        relation: Model.ManyToManyRelation,
        modelClass: __dirname + '/ProductModelDB',
        join: {
          from: 'swapRequests.id',
          through: {
            from: 'masterProducts_swapRequests.request_id',
            to: 'masterProducts_swapRequests.product_id'
          },
          to: 'products.id'
        }
      },
      slaveProducts: {
        relation: Model.ManyToManyRelation,
        modelClass: __dirname + '/ProductModelDB',
        join: {
          from: 'swapRequests.id',
          through: {
            from: 'slaveProducts_swapRequests.request_id',
            to: 'slaveProducts_swapRequests.product_id'
          },
          to: 'products.id'
        }
      }
    }
  }
}

module.exports = SwapRequestModel;
