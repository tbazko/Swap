'use strict';
const SwapRequest = rootRequire('app/core/dataBaseModels/SwapRequest');

class Counter {
  constructor(pageModel) {
    this._swapRequest = new SwapRequest();
    this.userId = pageModel.currentUserId;
  }

  get responseDataPromise() {
    let _responseDataPromise = this.getNewRequestsLength();
    return _responseDataPromise;
  }

  getNewRequestsLength() {
    let lengthPromise = new Promise((resolve, reject) => {
      console.log(this.userId);
      if(!this.userId) {
        return resolve({count: 0, currentUserId: this.userId});
      }
      this._swapRequest.getNewByCurrentUser(this.userId, (err, requests) => {
        console.log(err);
        console.log(requests);
        if(err) reject(err);
        resolve({count: requests.length, currentUserId: this.userId});
      });
    });

    return lengthPromise;
  }
}


module.exports = Counter;
