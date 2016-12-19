"use strict";
const Base = require('./Base');
const DataBaseSwapRequest = require('../dataBaseSchemas/SwapRequest');

class SwapRequest extends Base {
  constructor() {
    super(DataBaseSwapRequest);
  }

  create(req) {
    let swapForm = req.body;
    let masterItemId = req.params.id;
    let slaveItemIds = [];
    slaveItemIds = swapForm['itemId[]'];

    this.DataBaseSchema
      .query()
      .insertAndFetch({
        seller_id: swapForm.authorId,
        buyer_id: req.user.id,
        email: swapForm.email,
        phone: swapForm.phone,
        message: swapForm.message
      })
      .then(function(request) {
        request.$relatedQuery('masterItems').relate(masterItemId)
          .then(function() {
            console.log(slaveItemIds.length);
            console.log(typeof slaveItemIds);
            if(slaveItemIds.length === 1) {
              request.$relatedQuery('slaveItems').relate(slaveItemIds).then();
            } else {
              slaveItemIds.forEach(function(value, index) {
                request.$relatedQuery('slaveItems').relate(value).then();
              });
            }
          });
      })
      .catch(function(err) {
        console.log(err);
      });
  }

  getWithRelationsAndFilteredMessages(id, callback) {
    this.DataBaseSchema
      .query()
      .where(this.idName, id)
      .eager('[masterItems, slaveItems, seller, buyer, messages(orderByRegDate)]', {
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
