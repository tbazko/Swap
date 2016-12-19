"use strict";
const DataBaseSchema = rootRequire('config/database').Model;

class Message extends DataBaseSchema {
  static get tableName() {
    return 'requestMessages';
  }

  static get relationMappings() {
    return {
      swapRequest: {
        relation: DataBaseSchema.BelongsToOneRelation,
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
