"use strict";
const SwapRequest = require('../core/dataBaseModels/SwapRequest');

class SwapRequestCreator {
  constructor() {
    this.swapRequest = new SwapRequest();
  }

  handle(req, res, next) {
    this.swapRequest.req = req;
    this.res = res;
    this._insertNewSwapRequest();
  }

  _insertNewSwapRequest() {
    this.swapRequest.insert();
    this.res.send({ data: true });
  }
}

module.exports = SwapRequestCreator;
