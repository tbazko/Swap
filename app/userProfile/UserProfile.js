'use strict';
const User = rootRequire('app/core/dataBaseModels/User');

class UserProfile {
  constructor(pageModel) {
    this.userId = pageModel.userId;
    this.itemsOnly = pageModel.itemsOnly;
    this.isCurrentUserProfile = pageModel.isCurrentUserProfile;
    this.userDBmodel = new User();
  }

  get userPromise() {
    let userPromise = new Promise((resolve, reject) => {
      this.userDBmodel.getWithRelations(this.userId, 'items.[images]', (err, users) => {
        if(err) reject(err);
        resolve({
          user: users[0],
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
}

module.exports = UserProfile;
