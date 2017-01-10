'use strict';

class AccountModel {
  constructor() {
    this.userIsLoggedIn = false;
  }

  set data(data) {
    this.method = data.method;
    this.user = data.user;
    this.userIsLoggedIn = data.isAuthenticated();
  }

}

module.exports = AccountModel;
