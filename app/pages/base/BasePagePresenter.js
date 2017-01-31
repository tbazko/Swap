'use strict';
const AbstractPagePresenter = require('../AbstractPagePresenter');
const BasePageModel = require('./BasePageModel');

class BasePagePresenter extends AbstractPagePresenter {
  constructor(options) {
    super(options);
    this.model = new BasePageModel();
  }

  _parseRequest() {
    this.model.userId = this.req.user ? this.req.user.id : null;
  }
}

module.exports = BasePagePresenter;
