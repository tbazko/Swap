'use strict';
const Message = rootRequire('app/core/dataBaseModels/Message');

class MessageCreator {
  constructor() {
    this.message = new Message();
  }

  handle(req, res, next) {
    this.message.req = req;
    this.res = res;
    this._insertNewMessage()
  }

  _insertNewMessage() {
    this.message.create(function(err) {
      if(err) {
        return console.log(err);
      }
    });
  }
}

module.exports = MessageCreator;
