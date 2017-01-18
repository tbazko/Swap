"use strict";
const Base = require('./Base');
const DataBaseMessage = require('../dataBaseSchemas/Message');

class Message extends Base {
  constructor() {
    super(DataBaseMessage);
    this.req = undefined;
  }

  set data(data) {
    this._data = {
      text: data.message,
      user_id: data.userId,
      swapRequest_id: data.chatId
    }
  }

  get data() {
    return this._data;
  }

  insert(callback) {
    this.DataBaseSchema
      .query()
      .insert(this.data)
      .then(function() {
        callback(null)
      })
      .catch(function(err) {
        callback(err)
      });
  }

  getAllById(id, callback) {
    this.DataBaseSchema
      .query()
      .where(this.idName, id)
      .orderBy('reg_date', 'desc')
      .then((messages) => {
        callback(null, messages);
      })
      .catch((err) => callback(true, err));
  }
}

module.exports = Message;
