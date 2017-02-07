'use strict';
const BasePagePresenter = rootRequire('app/pages/base/BasePagePresenter');
const IndexPageModel = require('./IndexPageModel');

class IndexPagePresenter extends BasePagePresenter {
  constructor(options) {
    super(options);
    this.model = new IndexPageModel();
    this.model.itemListStrategy = options.itemListStrategy;
  }

  parseRequest() {
    super.parseRequest();
    this.model.path = this.req.path;
    this.model.userId = this.req.user ? this.req.user.id : false;
    this.model.params = this.req.params ? this.req.params : false;
  }
}

module.exports = IndexPagePresenter;
