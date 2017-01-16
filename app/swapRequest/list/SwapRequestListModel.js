'use strict';
const SwapRequest = rootRequire('app/core/dataBaseModels/SwapRequest');

class SwapRequestListModel {
  set data(data) {
    this._user = data.user;
    this._userId = data.user.id;
    this._swapRequest = new SwapRequest();
    this._swapRequest.idName = ['buyer_id', 'seller_id'];
  }

  get user() {
    return this._user;
  }

  get userId() {
    return this._userId;
  }

  get requests() {
    let requestsPromise = new Promise(this._getAllUserRequests.bind(this));
    return requestsPromise;
  }

  _getAllUserRequests(resolve, reject) {
    this._swapRequest
      .getWithRelations(this.userId, '[masterItems.[images], slaveItems.[images], seller, buyer]', (err, requests) => {
        if(err) reject(err);
        let sent = [];
        let incoming = [];

        requests.forEach((request) => {
          if(request.seller_id === this.userId) {
            incoming.push(request);
          } else if(request.buyer_id === this.userId) {
            sent.push(request);
          }
        });

        resolve({incoming: incoming, sent: sent});
      });
  }

}

module.exports = SwapRequestListModel;
