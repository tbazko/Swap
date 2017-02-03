'use strict';
const IndexPageModel = rootRequire('app/pages/index/IndexPageModel');
const UserProfile = rootRequire('app/userProfile/UserProfile');

class UserProfilePageModel extends IndexPageModel {
  constructor() {
    super();
    this.itemsOnly = null;
    this.userId = null;
    this.isCurrentUserProfile = null;
  }

  addComponents() {
    super.addComponents();
    this._add(UserProfile);
  }
}

module.exports = UserProfilePageModel;
