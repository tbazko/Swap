'use strict';
const User = rootRequire('app/core/dataBaseModels/User');
const ItemListModel = rootRequire('app/itemList/ItemListModel');

class UserProfileModel {
  constructor() {
    this.userId = null;
    this._userDBmodel = new User();
  }

  createItemList(strategy) {
    this._itemList = new ItemListModel(strategy);
  }

  set request(data) {
    this._request = data;
    this._itemList.data = data;
  }

  get request() {
    return this._request;
  }

  get userPromise() {
    let userPromise = new Promise((resolve, reject) => {
      this._userDBmodel.getWithRelations(this.userId, 'items.[images]', (err, users) => {
        if(err) reject(err);
        resolve(users[0]);
      });
    });
    return userPromise;
  }

  set user(user) {
    this._user = user;
    this._itemList.user = user;
  }

  get user() {
    return this._user;
  }

  getUserItemsPromise() {
    return this._itemList.items;
  }
}

module.exports = UserProfileModel;
