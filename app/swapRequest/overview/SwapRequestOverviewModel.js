'use strict';
const SwapRequest = rootRequire('app/core/dataBaseModels/SwapRequest');

class SwapRequestOverviewModel {
  set data(data) {
    this._user = data.user;
    this._requestId = data.params.id;
    this._url = data.baseUrl + data.path;
    this._swapRequest = new SwapRequest();
  }

  get user() {
    return this._user;
  }

  get requestId() {
    return this._requestId;
  }

  get url() {
    return this._url;
  }

  get request() {
    let requestPromise = new Promise(this._getRequestFullInfo.bind(this));
    return requestPromise;
  }

  _getRequestFullInfo(resolve, reject) {
    this._swapRequest
      .getWithRelationsAndSortedMessages(
        this.requestId,
        (err, requests) => {
          if(err) reject(err);
          let isBuyer = false;
          let request = requests[0];

          if(request && (request.buyer_id === this.user.id)) {
            isBuyer = true;
          }

          resolve({
            request: requests[0],
            user: this.user,
            url: this.url,
            currentUserIsBuyer: isBuyer
          });
      });
  }
}

module.exports = SwapRequestOverviewModel;
