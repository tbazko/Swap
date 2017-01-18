'use strict';
const SwapRequestOverviewModel = require('./SwapRequestOverviewModel');

class SwapRequestOverviewPresenter {
  constructor() {
    this.model = new SwapRequestOverviewModel;
    this.template = 'swapRequestOverviewView';
  }

  handle(req, res, next) {
    this.res = res;
    this.model.data = req;
    this.model.createChat();
    this._renderView();
  }

  _renderView() {
    this.model.rawData.then((data) => {
      this.res.render(this.template, this._formatDataForView(data));
    });
  }

  _formatDataForView(data) {
    let request = data[0];
    let messages = data[1];
    let formatted = {
      request: request,
      user: this.model._user,
      url: this.model._url,
      currentUserIsBuyer: !!request && (request.buyer_id === this.model._user.id),
      messages: messages
    };
    return formatted;
  }
}

module.exports = SwapRequestOverviewPresenter;
