'use strict';
const events = require('events');
const BasePageModel = rootRequire('app/pages/base/BasePageModel');
const UserProfile = rootRequire('app/UserProfile');

class UserProfileEditPageModel extends BasePageModel {
  constructor() {
    super();
    this.currentUser = null;
    this.userId = null;
    this.isCurrentUserProfile = null;
    this.eventEmitter = new events.EventEmitter();
  }

  addComponents() {
    super.addComponents();
    this.userProfile = this._create(UserProfile);
  }

  handleFormData(error, fields, files) {
    this.userProfile.handleFormData(error, fields, files);
  }
}

module.exports = UserProfileEditPageModel;
