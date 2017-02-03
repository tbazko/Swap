"use strict";
const Base = require('./Base');
const DataBaseUser = require('../dataBaseSchemas/User');
const UserEditor = require('./private/UserEditor');

class User extends Base {
  constructor() {
    super(DataBaseUser);
  }

  set userData(userData) {
    this._userData = {
      email: userData.email,
      password: userData.hash,
      firstName: userData.firstName || 'Anonymous',
      lastName: userData.lastName,
      phone: userData.phone,
      city: userData.city || '',
      state: userData.state,
      country: userData.country || ''
    }
  }

  get userData() {
    return this._userData;
  }

  createAndFetch(data, callback) {
    this.userData = data;
    this.DataBaseSchema
      .query()
      .insertAndFetch(this.userData)
      .then(function(user) {
        callback(null, user);
      })
      .catch(function(err) {
        callback(true, err);
      });
  }

  editAndGet(user, fields, files) {
    let u = new UserEditor(this);
    return u.editAndGet(user, fields, files);
  }
}

module.exports = User;
