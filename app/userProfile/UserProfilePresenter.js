"use strict";
const User = require('../core/dataBaseModels/User');

class UserProfilePresenter {
  constructor() {
    this.user = new User();
  }

  handle(req, res, next) {
    this.user.userId = req.user.id;
    this.res = res;
    this.getUser();
  }

  getUser() {
    this.user.getWithRelations(this.user.userId, 'newSwapRequests', this.renderProfile.bind(this));
  }

  renderProfile(err, currUser) {
    this.res.render('userProfileView', {user: currUser[0], newRequests: currUser[0].newSwapRequests.length});
  }
}

module.exports = UserProfilePresenter;
