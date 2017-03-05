'use strict';
const AbstractPagePresenter = require('../AbstractPagePresenter');
const BasePageModel = require('./BasePageModel');

class BasePagePresenter extends AbstractPagePresenter {
  constructor(options) {
    super(options);
    this.model = new BasePageModel();
  }

  parseRequest() {
    this.model.currentUserId = this.req.user ? this.req.user.id : null;
    this.model.originalUrl = this.req.originalUrl;
    this.model.hostname = this.req.hostname;
    this.model.path = this.req.path;
    this.model.query = this.model.query;
  }
}

module.exports = BasePagePresenter;
