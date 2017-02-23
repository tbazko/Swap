'use strict';
const stredit = rootRequire('app/helpers/StringEditor');

class UserEditor {
  constructor(dataBaseObject) {
    this._DBschema = dataBaseObject.DataBaseSchema;
    this._DBobject = dataBaseObject;
  }

  set userData(userData) {
    this._userData = {
      firstName: userData.firstName || 'Anonymous',
      lastName: userData.lastName,
      phone: userData.phone,
      streetNumber: userData.streetNumber,
      street: userData.street,
      postcode: userData.postcode,
      city: userData.city || userData.address,
      state: userData.state || '',
      country: userData.country || 'Ukraine',
      reset_password_token: userData.resetPasswordToken || null,
      reset_token_expires: userData.resetPasswordExpires || null
    }
  }

  get userData() {
    return this._userData;
  }

  editAndGet(user, fields, files) {
    this.user = user;
    this.userData = typeof fields === 'object' ? fields : user;
    if(user.passwordChange) {
      this._userData.password = user.password;
    }
    let editedItemPromise = new Promise((resolve, reject) => {
      this._DBschema
        .query()
        .patchAndFetchById(user.id, this.userData)
        .then((editedUser) => {
          resolve(editedUser);
        }).catch((err) => {
          console.log(err);
          reject(err);
        });
    });
    return editedItemPromise;
  }
}

module.exports = UserEditor;
