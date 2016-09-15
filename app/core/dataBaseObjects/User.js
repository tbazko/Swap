"use strict";
const DataBaseObject = require('../../../config/database').Model;

class User extends DataBaseObject {
  static get tableName() {
    return 'users';
  }

  static get relationMappings() {
    return {
      products: {
        relation: DataBaseObject.HasManyRelation,
        modelClass: __dirname + '/Product',
        join: {
          from: 'users.id',
          to: 'products.user_id'
        }
      },
      newSwapRequests: {
        relation: DataBaseObject.HasManyRelation,
        modelClass: __dirname + '/SwapRequest',
        join: {
          from: 'users.id',
          to: 'swapRequests.seller_id'
        }
      },
      swapRequestsIncoming: {
        relation: DataBaseObject.HasManyRelation,
        modelClass: __dirname + '/SwapRequest',
        join: {
          from: 'users.id',
          to: 'swapRequests.seller_id'
        }
      },
      swapRequestsOutgoing: {
        relation: DataBaseObject.HasManyRelation,
        modelClass: __dirname + '/SwapRequest',
        join: {
          from: 'users.id',
          to: 'swapRequests.buyer_id'
        }
      }
    }
  }
}

module.exports = User;
