'use strict';
const events = require('events');
const AbstractPageModel = rootRequire('app/pages/AbstractPageModel');
const UserModel = rootRequire('app/core/dataBaseModels/User');

class ResetPasswordPageModel extends AbstractPageModel {
  constructor() {
    super();
    this.currentUserId = null;
    this.originalUrl = null;
    this.token = null;
    this.error = null;
    this.userModel = new UserModel();
    this.userModel.idName = 'reset_password_token';
  }

  addComponents() {}

  reset() {
    let promise = new Promise((resolve, reject) => {
      this.userModel.getOneByIdentifier(this.token, function(err, user) {
        if (!user || user.reset_token_expires < Date.now()) {
          this.error = 'Password reset token is invalid or has expired.';
          resolve(this.error);          
        }
        resolve(null, user);
      });
    });
    return promise;
  }
}

module.exports = ResetPasswordPageModel;
