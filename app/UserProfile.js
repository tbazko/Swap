'use strict';
const User = rootRequire('app/core/dataBaseModels/User');

class UserProfile {
  constructor(pageModel) {
    this.userId = pageModel.userId;
    this.user = pageModel.currentUser;
    this.itemsOnly = pageModel.itemsOnly;
    this.isCurrentUserProfile = pageModel.isCurrentUserProfile;
    this.userDBmodel = new User();
    this.eventEmitter = pageModel.eventEmitter;
  }

  get userPromise() {
    let userPromise = new Promise((resolve, reject) => {
      this.userDBmodel.getWithRelations(this.userId, 'items.[images]', (err, users) => {
        if(err) reject(err);
        resolve({
          user: users[0] ? users[0] : null,
          itemsOnly: this.itemsOnly,
          isCurrentUserProfile: this.isCurrentUserProfile
        });
      });
    });
    return userPromise;
  }

  get responseDataPromise() {
    return this.userPromise;
  }

  handleFormData(error, fields, files) {
    if(error) this.error = error;
    this.files = files;
    this.fields = fields;
    this._updateUserProfile();
  }

  _updateUserProfile() {
    this.userDBmodel.editAndGet(this.user, this.fields, this.files).then((editedUser) => {
      this.eventEmitter.emit('formSaved', editedUser);
    });
  }
}

module.exports = UserProfile;
