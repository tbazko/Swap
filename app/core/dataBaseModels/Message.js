"use strict";
const Base = require('./Base');
const DataBaseMessage = require('../dataBaseSchemas/Message');

class Message extends Base {
  constructor() {
    super(DataBaseMessage);
    this.req = undefined;
  }

  create(callback) {
    var messageForm = this.req.body;
    var userId = this.req.user.id;
    var requestId = this.req.params.id;
    this.DataBaseSchema
      .query()
      .insert({
        text: messageForm.message,
        user_id: userId,
        swapRequest_id: requestId
      }).then(function() {
        callback(null)
      })
      .catch(function(err) {
        callback(err)
      });
  }
}

module.exports = Message;
