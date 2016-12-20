'use strict';
const SwapRequestListModel = require('./SwapRequestListModel');

class SwapRequestListPresenter {
  constructor() {
    this.model = new SwapRequestListModel();
    this.template = 'swapRequestListView';
  }

  handle(req, res, next) {
    this.model.data = req;
    this.res = res;
    this._renderView();
  }

  _renderView() {
    this.model.requests.then((requests) => {
      this.res.render(this.template, {user: this.model.user, requests: requests});
    });
  }
}

module.exports = SwapRequestListPresenter;
