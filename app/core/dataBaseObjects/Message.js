"use strict";
const Base = require('./Base');
const DataBaseMessage = require('../dataBaseSchemas/Message');

class Message extends Base {
  constructor() {
    super(DataBaseMessage);
  }

  create(req, callback) {
    var messageForm = req.body;
    var userId = req.user.id;
    var requestId = req.params.id;
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
