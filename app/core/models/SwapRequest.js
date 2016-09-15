"use strict";
const Base = require('./Base');
const DataBaseSwapRequest = require('../dataBaseObjects/SwapRequest');

class SwapRequest extends Base {
  constructor() {
    super(DataBaseSwapRequest);
  }

  create(req) {
    let swapForm = req.body;
    let masterProductId = req.params.id;
    let slaveProductIds = [];
    slaveProductIds = swapForm['productId[]'];

    this.DataBaseObject
      .query()
      .insertAndFetch({
        seller_id: swapForm.authorId,
        buyer_id: req.user.id,
        email: swapForm.email,
        phone: swapForm.phone,
        message: swapForm.message
      })
      .then(function(request) {
        request.$relatedQuery('masterProducts').relate(masterProductId);
        slaveProductIds.forEach(function(value, index) {
          request.$relatedQuery('slaveProducts').relate(value);
        });
      });
  }

}

module.exports = SwapRequest;
