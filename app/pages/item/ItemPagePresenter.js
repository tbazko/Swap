'use strict';
const BasePagePresenter = rootRequire('app/pages/base/BasePagePresenter');
const ItemPageModel = require('./ItemPageModel');

class ItemPagePresenter extends BasePagePresenter {
  constructor(options) {
    super(options);
    this.model = new ItemPageModel();
  }

  _parseRequest() {
    super._parseRequest();
    this.model.itemId = this.req.params.id;
    this.model.currentUserId = this.req.user ? this.req.user.id : undefined;
  }
}

module.exports = ItemPagePresenter;
