"use strict";
const DataBaseObject = require('../../../config/database').Model;

class Message extends DataBaseObject {
  static get tableName() {
    return 'requestMessages';
  }

  static get relationMappings() {
    return {
      swapRequest: {
        relation: DataBaseObject.BelongsToOneRelation,
        modelClass: __dirname + '/SwapRequest',
        join: {
          from: 'requestMessages.swapRequest_id',
          to: 'swapRequests.id'
        }
      }
    }
  }
}

module.exports = Message;
