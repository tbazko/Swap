'use strict';
const ItemListFilter = rootRequire('app/itemList/ItemListFilter');
let defaultStrategy = require('./strategies/default');

class ItemList {
  constructor(pageModel) {
    this.strategy = pageModel.itemListStrategy || defaultStrategy;
    this.path = pageModel.path;
    this.userId = pageModel.userId;
    this.params = pageModel.params ? pageModel.params : undefined;
    this.categoryId = pageModel.query && pageModel.query.cid ? pageModel.query.cid : undefined;
    this.categoryName = this.params && this.params.id ? this.params.id : undefined;
    this.tag = pageModel.query && pageModel.query.tag ? pageModel.query.tag : undefined;
    this.searchTerm = pageModel.query && pageModel.query.search ? pageModel.query.search : undefined;
  }

  set categoryId(id) {
    let isSubCategory = id % 100 != 0;
    if(isSubCategory) {
      this._categoryId = id - (id % 100);
      this._subcategoryId = id;
    } else {
      this._categoryId = id;
    }
  }

  get categoryId() {
    return this._categoryId;
  }

  get subcategoryId() {
    return this._subcategoryId;
  }

  get items() {
    this._configureFilter();
    return this.filter.build().then((items) => {
      if(items && items.length > 0) {
        return {items: items, categoryName: this.categoryName, categoryId: this.categoryId, subcategoryId: this.subcategoryId, tag: this.filter.tag};
      } else {
        return {items: null, categoryName: this.categoryName, categoryId: this.categoryId, subcategoryId: this.subcategoryId, tag: this.filter.tag};
      }
    });
  }

  get responseDataPromise() {
    return this.items;
  }

  _configureFilter() {
    this.filter = new ItemListFilter();
    this.filter.tag = typeof this.tag === 'object' ? this.tag[0] : this.tag;
    this.filter.categoryId = this.categoryId;
    this.filter.subcategoryId = this.subcategoryId;
    this.filter.searchTerm = this.searchTerm;
    this.strategy.configureFilter(this);
  }
}

module.exports = ItemList;
