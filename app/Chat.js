'use strict';
const Message = rootRequire('app/core/dataBaseModels/Message');
const socket = rootRequire('app/socketAPI').getInstance();

class Chat {
  constructor(options) {
    this._message = new Message();
    this._message.idName = 'swapRequest_id';
    this._chatId = options.chatId;
    this._currentUser = options.currentUser;
    this._socket = socket;
    this._chatRoom = options.path;
  }

  listen() {
    this._socket.on('chatMessage', this._update.bind(this));
  }

  get messages() {
    if(!this._chatId) {
      return Promise.resolve({messages: []});
    }
    
    let messagesPromise = new Promise((resolve, reject) => {
      this._message.getAllById(this._chatId, (err, messages) => {
        if(err) reject(err);
        resolve({messages: messages});
      });
    });
    return messagesPromise;
  }

  get responseDataPromise() {
    return this.messages;
  }

  _update(text) {
    this._socket.to(this._chatRoom).emit('chatMessage', {
      text: text,
      senderName: this._currentUser.firstName,
      senderId: this._currentUser.id
    });
    this._message.data = {
      message: text,
      userId: this._currentUser.id,
      chatId: this._chatId
    }
    this._insertNewMessage();
  }

  _insertNewMessage() {
    this._message.insert((err) => {
      if(err) {
        return console.log(err);
      }
    });
  }
}

module.exports = Chat;
