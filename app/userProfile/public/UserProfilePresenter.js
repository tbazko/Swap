'use strict';
const UserProfileModel = require('./UserProfileModel');

class UserProfilePresenter {
  constructor(template) {
    this.template = 'userProfileView';
    this.model = new UserProfileModel();
  }

  handle(req, res, next) {
    this.res = res;
    this.model.requests = req;
    this.model.userId = req.params.id;
    this._renderView();
  }

  _renderView() {
    this.model.userPromise.then((user) => {
      this.model.user = user;
      return this.model.getUserItemsPromise();
    }).then((items) => {
      this.res.render(this.template, {user: this.model.user, items: items});
    }).catch((err) => {
      console.log(err);
    });
  }
}

module.exports = UserProfilePresenter;
