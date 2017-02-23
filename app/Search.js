'use strict';
const Item = rootRequire('app/core/dataBaseModels/Item');
const Tag = rootRequire('app/core/dataBaseModels/Tag');
const Category = rootRequire('app/core/dataBaseModels/Category');
const validator = rootRequire('app/FormValidator');

class Search {
  constructor() {
    this.itemModel = new Item();
    this.categoryModel = new Category();
    this.tagModel = new Tag();
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
      this.results = this._arrayToObject(results);
      this.searchCallback(this.results);
    });
  }

  resultsPromise() {
    let categoryPromise = this.categoryModel.searchPromise(this.str).then((categories) => {
      let categoriesWithMatches = []
      categories.forEach((category) => {
        if(category.items.length || category.subitems.length) {
          category.item = category.items[0] || category.subitems[0];
          delete category.items;
          delete category.subitems;
          categoriesWithMatches.push(category);
        }
      });
      return {categories: categoriesWithMatches}
    });
    let tagPromise = this.tagModel.searchPromise(this.str).then((tags) => {
      return {tags: tags}
    });

    return Promise.all([categoryPromise, tagPromise])
  }

  _arrayToObject(pageData) {
    let formattedPageData = {};
    pageData.forEach((cluster) => {
      for(var key in cluster) {
        if (!cluster.hasOwnProperty(key)) continue;
        formattedPageData[key] = cluster[key];
      }
    });
    return formattedPageData;
  }
}

module.exports = Search;
