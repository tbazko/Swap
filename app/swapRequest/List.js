'use strict';
const SwapRequest = rootRequire('app/core/dataBaseModels/SwapRequest');

class SwapRequestList {
  constructor(pageModel) {
    this.user = pageModel.currentUser;
    this.userId = pageModel.currentUserId;
    this._swapRequest = new SwapRequest();
    this._swapRequest.idName = ['buyer_id', 'seller_id'];
  }

  get requests() {
    let requestsPromise = new Promise(this._getAllUserRequests.bind(this));
    return requestsPromise;
  }

  _getAllUserRequests(resolve, reject) {
    this._swapRequest.orderBy = "unix_time";
    this._swapRequest.orderDirection = "DESC";
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

        resolve({
          requests: {
            incoming: incoming,
            sent: sent
          }
        });
      });
  }

  get responseDataPromise() {
    return this.requests;
  }
}

module.exports = SwapRequestList;
