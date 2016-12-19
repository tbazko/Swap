'use strict';

class ItemListModel {
  constructor(strategy) {
    this.strategy = strategy;
    this._observerList = [];
  }

  set modelData(req) {
    this._path = req.path;
    this._user = req.user ? req.user : false;
    this._params = req.params ? req.params : false;
    this.method = req.method;
  }

  set method(method) {
    this._method = method;
    this.notifyObservers();
  }

  get params() {
    return this._params;
  }

  get method() {
    return this._method;
  }

  get user() {
    return this._user;
  }

  get path() {
    return this._path;
  }

  get items() {
    let itemsPromise = new Promise((resolve, reject) => {
      this.strategy.items(resolve, reject, this);
    });
    return itemsPromise;
  }

  addObserver(callback) {
		if (typeof callback === 'function') {
			this._observerList.push(callback);
		}
	}

	notifyObservers(data) {
		this._observerList.forEach(callback => {
			callback(data);
		});
	}
}

module.exports = ItemListModel;
