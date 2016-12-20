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
    this._renderView();
  }

  _renderView() {
    this.model.request.then((response) => {
      this.res.render(this.template, response);
    });
  }
}

module.exports = SwapRequestOverviewPresenter;
