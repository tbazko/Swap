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
      country: userData.country || 'Ukraine'
    }
  }

  get userData() {
    return this._userData;
  }

  editAndGet(user, fields, files) {
    this.user = user;
    this.userData = fields;

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
