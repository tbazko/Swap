'use strict';
const SwapRequest = rootRequire('app/core/dataBaseModels/SwapRequest');

class Counter {
  constructor() {
    this._swapRequest = new SwapRequest();
    this.userId = null;
  }

  getNewRequestsLength() {
    let lengthPromise = new Promise((resolve, reject) => {
      this._swapRequest.getNewByCurrentUser(this.userId, (err, requests) => {
        if(err) reject(err);
        resolve(requests.length);
      });
    });

    return lengthPromise;
  }
}


module.exports = Counter;
