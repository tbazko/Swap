'use strict';
const BasePagePresenter = rootRequire('app/pages/base/BasePagePresenter');
const Model = require('./model');

class SwapRequestOverviewPresenter extends BasePagePresenter {
  constructor(options) {
    super(options);
    this.model = new Model();
  }

  parseRequest() {
    super.parseRequest();
    this.model.requestId = this.req.params.id;
    this.model.chatId = this.req.params.id;
    this.model.currentUser = this.req.user;
    this.model.path = this.req.path;
  }
}

module.exports = SwapRequestOverviewPresenter;
