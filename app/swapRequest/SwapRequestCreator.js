"use strict";
const SwapRequest = require('../core/dataBaseModels/SwapRequest');
const socketio = rootRequire('app/socketio').getSocketio();

class SwapRequestCreator {
  constructor() {
    this.swapRequest = new SwapRequest();
  }

  handle(req, res, next) {
    this.seller_id = req.body.authorId;
    this.buyer_id = req.user.id;
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
