"use strict";
const DataBaseObject = require('../../../config/database').Model;

class SwapRequest extends DataBaseObject {
  static get tableName() {
    return 'swapRequests';
  }

  static get relationMappings() {
    return {
      messages: {
        relation: DataBaseObject.HasManyRelation,
        modelClass: __dirname + '/Message',
        join: {
          from: 'swapRequests.id',
          to: 'requestMessages.swapRequest_id'
        }
      },
      seller: {
        relation: DataBaseObject.BelongsToOneRelation,
        modelClass: __dirname + '/User',
        join: {
          from: 'swapRequests.seller_id',
          to: 'users.id'
        }
      },
      buyer: {
        relation: DataBaseObject.BelongsToOneRelation,
        modelClass: __dirname + '/User',
        join: {
          from: 'swapRequests.buyer_id',
          to: 'users.id'
        }
      },
      swapRequestsIncoming: {
        relation: DataBaseObject.BelongsToOneRelation,
        modelClass: __dirname + '/User',
        join: {
          from: 'swapRequests.buyer_id',
          to: 'users.id'
        }
      },
      swapRequestsOutgoing: {
        relation: DataBaseObject.HasManyRelation,
        modelClass: __dirname + '/User',
        join: {
          from: 'swapRequests.seller_id',
          to: 'users.id'
        }
      },
      masterProducts: {
        relation: DataBaseObject.ManyToManyRelation,
        modelClass: __dirname + '/Product',
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
        relation: DataBaseObject.ManyToManyRelation,
        modelClass: __dirname + '/Product',
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

module.exports = SwapRequest;
