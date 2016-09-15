"use strict";
const Base = require('./Base');
const DataBaseUser = require('../dataBaseObjects/User');

class User extends Base {
  constructor() {
    super(DataBaseUser);
  }
}

module.exports = User;
