'use strict';
const IndexPagePresenter = rootRequire('app/pages/index/IndexPagePresenter');
const UserProfilePageModel = require('./UserProfilePageModel');

class UserProfilePagePresenter extends IndexPagePresenter {
  constructor(options) {
    super(options);
    this.model = new UserProfilePageModel();
    this.model.itemListStrategy = options.itemListStrategy;
  }

  parseRequest() {
    super.parseRequest();
    this.model.itemsOnly = /\/items-list/.test(this.req.path);
    this.model.userId = this.req.params.userId || this.req.user.id;
    this.model.isCurrentUserProfile = this.req.params.userId ? false : true;
  }
}

module.exports = UserProfilePagePresenter;
