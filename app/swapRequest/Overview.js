'use strict';
const SwapRequest = rootRequire('app/core/dataBaseModels/SwapRequest');
const SwapRequestStatusChanger = rootRequire('app/swapRequest/SwapRequestStatusChanger');

class SwapRequestOverview {
  constructor(pageModel) {
    this._status = new SwapRequestStatusChanger();
    this._swapRequestModel = new SwapRequest();
    this._requestId = pageModel.requestId;
    this._currentUser = pageModel.currentUser;
    this._path = pageModel.path;
    this._status.room = pageModel.path;
  }

  get rawData() {
    let rawDataPromise = new Promise(this._requestRawData.bind(this));
    return rawDataPromise;
  }

  get responseDataPromise() {
    return this.rawData;
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
            resolve({
              request: this.swapRequest,
              user: this._currentUser,
              currentUserIsBuyer: this.swapRequest.buyer_id === this._currentUser.id
            });
          } else {
            resolve(undefined);
          }
      });
  }

}

module.exports = SwapRequestOverview;
