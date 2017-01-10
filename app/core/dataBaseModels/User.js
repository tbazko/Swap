"use strict";
const Base = require('./Base');
const DataBaseUser = require('../dataBaseSchemas/User');

class User extends Base {
  constructor() {
    super(DataBaseUser);
  }

  createAndFetch(userData, callback) {
    this.DataBaseSchema
      .query()
      .insertAndFetch({
        email: userData.username,
        password: userData.hash,
        firstName: userData.firstName || 'Anonymous',
        city: userData.city || '',
        country: userData.country || ''
      })
      .then(function(user) {
        callback(null, user);
      })
      .catch(function(err) {
        callback(true, err);
      });
  }
}

module.exports = User;
