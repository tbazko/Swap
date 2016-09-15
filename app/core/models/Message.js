"use strict";
const Base = require('./Base');
const DataBaseMessage = require('../dataBaseObjects/Message');

class Message extends Base {
  constructor() {
    super(DataBaseMessage);
  }

  create(req) {
    var messageForm = req.body;
    var userId = req.user.id;
    var requestId = req.params.id;
    this.DataBaseObject
      .query()
      .insert({
        text: messageForm.message,
        user_id: userId,
        swapRequest_id: requestId
      });
  }
}

module.exports = Message;
