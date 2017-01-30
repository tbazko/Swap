"use strict";
const SwapRequest = require('../core/dataBaseModels/SwapRequest');
const Item = require('../core/dataBaseModels/Item');
let socket = rootRequire('app/socketAPI').getInstance();

class SwapRequestStatusChanger {
  constructor() {
    this.swapRequest = null;
    this.room = null;
    this._swapRequestDBmodel = new SwapRequest();
    this._itemDBmodel = new Item();
    this._socket = socket;
    this._currentStatus = null;
  }

  update() {
    // Do not remove these, related to everything accepted at once bug
    console.log('update');
    if(this.swapRequest.status === 'new') {
      this._changeTo('pending');
    } else {
      console.log(this._currentStatus);
      console.log(this.swapRequest.status);
      this._currentStatus = this.swapRequest.status;
    }
    return this._currentStatus;
  }

  _changeTo(status) {
    if(status && status !== this._currentStatus) {
      this._currentStatus = status;
      this._socket.to(this.room).emit('updateStatus', this._currentStatus);
      this._updateStatusInDB();

      if(status === 'accepted') {
        this._updateItemsStatusInDB();
      }
    }
  }

  listen() {
    this._socket.on('statusChanged', this._changeTo.bind(this));
  }

  _updateStatusInDB() {
    this._swapRequestDBmodel.id = this.swapRequest.id;
    this._swapRequestDBmodel.patch('status', this._currentStatus);
  }

  _updateItemsStatusInDB() {
    var items = this.swapRequest.masterItems.concat(this.swapRequest.slaveItems);
    items.forEach((item) => {
      this._itemDBmodel.id = item.id;
      this._itemDBmodel.patch('status', this._currentStatus);
    });
  }
}

module.exports = SwapRequestStatusChanger;
