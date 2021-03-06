"use strict";
const Base = require('./Base');
const DataBaseSwapRequest = require('../dataBaseSchemas/SwapRequest');
const socket = rootRequire('app/socketAPI').getInstance();

class SwapRequest extends Base {
  constructor() {
    super(DataBaseSwapRequest);
    this.req = null;
    this.id = null;
  }

  insert() {
    let swapForm = this.req.body;
    let masterItemId = this.req.params.id;
    let slaveItemIds = [];
    let data = {
      seller_id: swapForm.seller_id,
      buyer_id: this.req.user.id,
      message: swapForm.message,
      unix_time: this.DataBaseSchema.raw('UNIX_TIMESTAMP()'),
      local_time: this.DataBaseSchema.raw('date_format(now(), "%D %M %Y, %H:%i")')
    }
    slaveItemIds = swapForm['itemId[]'];

    this.DataBaseSchema
      .query()
      .insertAndFetch(data)
      .then(function(request) {
        request.$relatedQuery('masterItems').relate(masterItemId)
          .then(function() {
            if(typeof slaveItemIds === 'string') {
              request.$relatedQuery('slaveItems').relate(slaveItemIds).then();
            } else {
              slaveItemIds.forEach(function(value, index) {
                request.$relatedQuery('slaveItems').relate(value).then();
              });
            }

            socket.to(request.seller_id).emit('newSwapRequest', request);
          });
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  getNewByCurrentUser(id, callback) {
    this.DataBaseSchema
      .query()
      .where('seller_id', id)
      .andWhere('status', 'new')
      .then((requests) => {
        callback(null, requests);
      }).catch((err) => {
        callback(err);
      });
  }
}

module.exports = SwapRequest;
