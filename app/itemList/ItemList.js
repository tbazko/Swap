'use strict';

class ItemList {
  constructor(pageModel) {
    this.strategy = pageModel.itemListStrategy;
    this._observerList = [];
    this.path = pageModel.path;
    this.userId = pageModel.userId;
    this.params = pageModel.params ? pageModel.params : false;
  }

  get items() {
    let itemsPromise = new Promise((resolve, reject) => {
      this.strategy.items(resolve, reject, this);
    });
    return itemsPromise;
  }

  get responseDataPromise() {
    return this.items;
  }
}

module.exports = ItemList;
