"use strict";
const DataBaseSchema = rootRequire('config/database').Model;

class User extends DataBaseSchema {
  static get tableName() {
    return 'users';
  }

  static get relationMappings() {
    return {
      items: {
        relation: DataBaseSchema.HasManyRelation,
        modelClass: __dirname + '/Item',
        join: {
          from: 'users.id',
          to: 'items.user_id'
        }
      },
      newSwapRequests: {
        relation: DataBaseSchema.HasManyRelation,
        modelClass: __dirname + '/SwapRequest',
        join: {
          from: 'users.id',
          to: 'swapRequests.seller_id'
        }
      },
      swapRequestsIncoming: {
        relation: DataBaseSchema.HasManyRelation,
        modelClass: __dirname + '/SwapRequest',
        join: {
          from: 'users.id',
          to: 'swapRequests.seller_id'
        }
      },
      swapRequestsOutgoing: {
        relation: DataBaseSchema.HasManyRelation,
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
