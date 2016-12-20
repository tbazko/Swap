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
      .getWithRelations(this.userId, '[masterItems, slaveItems, seller, buyer]', (err, requests) => {
        if(err) reject(err);
        resolve(requests);
      });
  }

}

module.exports = SwapRequestListModel;
