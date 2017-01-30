"use strict";
const UserProfilePresenter = rootRequire('app/userProfile/public/UserProfilePresenter');
const strategy = rootRequire('app/itemList/strategies/filteredByCurrentUser');

class CurrentUserProfilePresenter extends UserProfilePresenter {
  constructor() {
    super();
  }

  handle(req, res, next) {
    this.res = res;
    this.model.requests = req;
    this.model.userId = req.user.id;
    this.itemsOnly = /user\/items/.test(req.path);
    this.model.createItemList(strategy);
    this._renderView();
  }
}

module.exports = CurrentUserProfilePresenter;
