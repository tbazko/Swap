'use strict';
const UserProfileModel = require('./UserProfileModel');
const strategy = rootRequire('app/itemList/strategies/filteredByUser');

class UserProfilePresenter {
  constructor(template) {
    this.template = 'userProfileView';
    this.model = new UserProfileModel();
  }

  handle(req, res, next) {
    this.res = res;
    this.model.requests = req;
    this.model.userId = req.params.id;
    this.itemsOnly = /user\/\d+\/items/.test(req.path);
    this.model.createItemList(strategy);
    this._renderView();
  }

  _renderView() {
    this.model.userPromise.then((user) => {
      this.model.user = user;
      return this.model.getUserItemsPromise();
    }).then((items) => {
      this.res.render(this.template, {
        user: this.model.user,
        items: items,
        itemsOnly: this.itemsOnly
      });
    }).catch((err) => {
      console.log(err);
    });
  }
}

module.exports = UserProfilePresenter;
