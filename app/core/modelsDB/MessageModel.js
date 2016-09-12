"use strict";
const Model = require('../../../config/database').Model;

class MessageModel extends Model {
  static get tableName() {
    return 'requestMessages';
  }

  static get relationMappings() {
    return {
      swapRequest: {
        relation: Model.BelongsToOneRelation,
        modelClass: __dirname + '/SwapRequestModel',
        join: {
          from: 'requestMessages.swapRequest_id',
          to: 'swapRequests.id'
        }
      }
    }
  }
}

module.exports = MessageModel;
