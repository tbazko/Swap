'use strict';
const IndexPagePresenter = rootRequire('app/pages/index/IndexPagePresenter');
const UserProfilePageModel = require('./UserProfilePageModel');

class UserProfilePagePresenter extends IndexPagePresenter {
  constructor(options) {
    super(options);
    this.model = new UserProfilePageModel();
    this.model.itemListStrategy = options.itemListStrategy;
  }

  _parseRequest() {
    super._parseRequest();
    this.model.itemsOnly = /\/items/.test(this.req.path);
    this.model.userId = this.req.params.id || this.req.user.id;
    this.model.isCurrentUserProfile = this.req.params.id ? false : true;
  }
}

module.exports = UserProfilePagePresenter;
