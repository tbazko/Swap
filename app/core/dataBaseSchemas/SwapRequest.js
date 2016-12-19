"use strict";
const DataBaseSchema = rootRequire('config/database').Model;

class SwapRequest extends DataBaseSchema {
  static get tableName() {
    return 'swapRequests';
  }

  static get relationMappings() {
    return {
      messages: {
        relation: DataBaseSchema.HasManyRelation,
        modelClass: __dirname + '/Message',
        join: {
          from: 'swapRequests.id',
          to: 'requestMessages.swapRequest_id'
        }
      },
      seller: {
        relation: DataBaseSchema.BelongsToOneRelation,
        modelClass: __dirname + '/User',
        join: {
          from: 'swapRequests.seller_id',
          to: 'users.id'
        }
      },
      buyer: {
        relation: DataBaseSchema.BelongsToOneRelation,
        modelClass: __dirname + '/User',
        join: {
          from: 'swapRequests.buyer_id',
          to: 'users.id'
        }
      },
      swapRequestsIncoming: {
        relation: DataBaseSchema.BelongsToOneRelation,
        modelClass: __dirname + '/User',
        join: {
          from: 'swapRequests.buyer_id',
          to: 'users.id'
        }
      },
      swapRequestsOutgoing: {
        relation: DataBaseSchema.HasManyRelation,
        modelClass: __dirname + '/User',
        join: {
          from: 'swapRequests.seller_id',
          to: 'users.id'
        }
      },
      masterItems: {
        relation: DataBaseSchema.ManyToManyRelation,
        modelClass: __dirname + '/Item',
        join: {
          from: 'swapRequests.id',
          through: {
            from: 'masterItems_swapRequests.request_id',
            to: 'masterItems_swapRequests.item_id'
          },
          to: 'items.id'
        }
      },
      slaveItems: {
        relation: DataBaseSchema.ManyToManyRelation,
        modelClass: __dirname + '/Item',
        join: {
          from: 'swapRequests.id',
          through: {
            from: 'slaveItems_swapRequests.request_id',
            to: 'slaveItems_swapRequests.item_id'
          },
          to: 'items.id'
        }
      }
    }
  }
}

module.exports = SwapRequest;
