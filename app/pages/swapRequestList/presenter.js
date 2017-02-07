'use strict';
const BasePagePresenter = rootRequire('app/pages/base/BasePagePresenter');
const Model = require('./model');

class SwapRequestListPresenter extends BasePagePresenter {
  constructor(options) {
    super(options);
    this.model = new Model();
  }

  parseRequest() {
    super.parseRequest();
    this.model.currentUser = this.req.user;
  }
}

module.exports = SwapRequestListPresenter;
