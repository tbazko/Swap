"use strict";
const Model = require('../../../config/database').Model;

class UserModel extends Model {
  static get tableName() {
    return 'users';
  }

  static get relationMappings() {
    return {
      products: {
        relation: Model.HasManyRelation,
        modelClass: __dirname + '/ProductModelDB',
        join: {
          from: 'users.id',
          to: 'products.user_id'
        }
      },
      newSwapRequests: {
        relation: Model.HasManyRelation,
        modelClass: __dirname + '/SwapRequestModel',
        join: {
          from: 'users.id',
          to: 'swapRequests.seller_id'
        }
      },
      swapRequestsIncoming: {
        relation: Model.HasManyRelation,
        modelClass: __dirname + '/SwapRequestModel',
        join: {
          from: 'users.id',
          to: 'swapRequests.seller_id'
        }
      },
      swapRequestsOutgoing: {
        relation: Model.HasManyRelation,
        modelClass: __dirname + '/SwapRequestModel',
        join: {
          from: 'users.id',
          to: 'swapRequests.buyer_id'
        }
      }
    }
  }
}

module.exports = UserModel;
