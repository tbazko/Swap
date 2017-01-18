'use strict';
const SwapRequest = rootRequire('app/core/dataBaseModels/SwapRequest');
const Chat = rootRequire('app/chat/Chat');

class SwapRequestOverviewModel {
  set data(data) {
    this._requestId = data.params.id;
    this._user = data.user;
    this._url = data.baseUrl + data.path;
    this._path = data.path;
    this._swapRequest = new SwapRequest();
  }

  get rawData() {
    let requestPromise = new Promise(this._getRequestInfo.bind(this));
    let messagesPromise = this.chat.messages;
    return Promise.all([requestPromise, messagesPromise]);
  }

  createChat() {
    this.chat = new Chat({
      chatId: this._requestId,
      currentUser: this._user,
      path: this._path
    });
    this.chat.listen();
  }

  _getRequestInfo(resolve, reject) {
    this._swapRequest
      .getWithRelations(this._requestId,
        '[masterItems.[images], slaveItems.[images], seller, buyer]',
        (err, requests) => {
          if(err) reject(err);
          resolve(requests[0]);
      });
  }
}

module.exports = SwapRequestOverviewModel;
