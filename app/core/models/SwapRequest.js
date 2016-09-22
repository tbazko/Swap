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
        request.$relatedQuery('masterProducts').relate(masterProductId)
          .then(function() {
            console.log(slaveProductIds.length);
            console.log(typeof slaveProductIds);
            if(slaveProductIds.length === 1) {
              request.$relatedQuery('slaveProducts').relate(slaveProductIds).then();
            } else {
              slaveProductIds.forEach(function(value, index) {
                request.$relatedQuery('slaveProducts').relate(value).then();
              });
            }
          });
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  getWithRelationsAndFilteredMessages(id, callback) {
    this.DataBaseObject
      .query()
      .where(this.idName, id)
      .eager('[masterProducts, slaveProducts, seller, buyer, messages(orderByRegDate)]', {
        orderByRegDate: function(builder) {
          builder.orderBy('reg_date', 'desc');
        }
      })
      .then(function(items) {
        callback(null, items);
      })
      .catch(function(err) {
        callback(true, err);
      });
  }
}

module.exports = SwapRequest;
