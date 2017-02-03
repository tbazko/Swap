'use strict';

class UserEditor {
  constructor(dataBaseObject) {
    this._DBschema = dataBaseObject.DataBaseSchema;
    this._DBobject = dataBaseObject;
  }

  set userData(userData) {
    this._DBobject.userData = userData;
  }

  get userData() {
    return this._DBobject.userData;
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
