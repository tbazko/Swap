'use strict';
const SwapRequest = rootRequire('app/core/dataBaseModels/SwapRequest');
const SwapRequestStatusChanger = rootRequire('app/swapRequest/SwapRequestStatusChanger');
const Chat = rootRequire('app/chat/Chat');

class SwapRequestOverviewModel {
  constructor() {
    this._chat = null;
    this._status = new SwapRequestStatusChanger();
    this._swapRequestModel = new SwapRequest();
  }

  set data(data) {
    this._requestId = data.params.id;
    this._user = data.user;
    this._url = data.baseUrl + data.path;
    this._path = data.path;
    this._status.room = this._path;
  }

  get rawData() {
    let rawDataPromise = new Promise(this._requestRawData.bind(this));
    let messagesPromise = this._chat.messages;
    return Promise.all([rawDataPromise, messagesPromise]);
  }

  createChat() {
    this._chat = new Chat({
      chatId: this._requestId,
      currentUser: this._user,
      path: this._path
    });
    this._chat.listen();
  }

  _requestRawData(resolve, reject) {
    this._swapRequestModel
      .getWithRelations(this._requestId,
        '[masterItems.[images], slaveItems.[images], seller, buyer]',
        (err, requests) => {
          if(err) reject(err);
          if(requests[0]) {
            this.swapRequest = requests[0];
            this._status.swapRequest = this.swapRequest;
            this.swapRequest.status = this._status.update();
            this._status.listen();
            resolve(this.swapRequest);
          } else {
            resolve(undefined);
          }
      });
  }
}

module.exports = SwapRequestOverviewModel;
