'use strict';
const Item = rootRequire('app/core/dataBaseModels/Item');
const validator = rootRequire('app/FormValidator');

class Search {
  constructor() {
    this.itemModel = new Item();
    this.str = '';
    this.searchCallback = null;
    this._results = null;
  }

  search(searchStr, callback) {
    this.str = searchStr;

    if(this.str != '' && validator.isValidString(this.str)) {
      this.searchCallback = callback;
      this._sendResultsToClient();
    }
  }

  _sendResultsToClient() {
    this.resultsPromise().then((results) => {
      this.results = results;
      this.searchCallback(this.results);
    });
  }

  resultsPromise() {
    return this.itemModel.searchPromise(this.str);
  }
}

module.exports = Search;
