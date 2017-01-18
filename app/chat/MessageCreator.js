'use strict';
const Message = rootRequire('app/core/dataBaseModels/Message');

class MessageCreator {
  constructor() {
    this.message = new Message();
  }

  handle(req, res, next) {
    this.message.req = req;
    this.res = res;
    this._insertNewMessage();
  }

  _insertNewMessage() {
    this.message.create((err) => {
      if(err) {
        return console.log(err);
      }
      this.res.send('ok');
    });
  }
}

module.exports = MessageCreator;
