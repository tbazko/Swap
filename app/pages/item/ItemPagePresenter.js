'use strict';
const BasePagePresenter = rootRequire('app/pages/base/BasePagePresenter');
const ItemPageModel = require('./ItemPageModel');

class ItemPagePresenter extends BasePagePresenter {
  constructor(options) {
    super(options);
    this.model = new ItemPageModel();
  }

  parseRequest() {
    super.parseRequest();
    this.model.itemId = this.req.params.id;
  }
}

module.exports = ItemPagePresenter;
