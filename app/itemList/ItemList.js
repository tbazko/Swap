'use strict';
const ItemListFilter = rootRequire('app/itemList/ItemListFilter');
const Pagination = rootRequire('app/Pagination');
const async = require('async');

class ItemList {
  constructor(pageModel) {
    this.strategy = pageModel.itemListStrategy ? require('./strategies/' + pageModel.itemListStrategy) : require('./strategies/default');
    this.path = pageModel.path;
    this.userId = pageModel.userId;
    this.params = pageModel.params ? pageModel.params : undefined;
    this.categoryId = pageModel.query && pageModel.query.cid ? pageModel.query.cid : undefined;
    this.categoryName = this.params && this.params.id ? this.params.id : undefined;
    this.showActiveItems = typeof pageModel.query.active === 'undefined' ? true : pageModel.query.active === 'true';
    this.page = 1;

    if(pageModel.query) {
      this.tag = pageModel.query.tag;
      this.searchTerm = pageModel.query.search;
      this.page = pageModel.query.page || 1;
    }
    this.filter = new ItemListFilter();
    this.pagination = new Pagination({page: this.page});
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

  get list() {
    this._configureFilter();
    return this.filter.build()
      .then((filter) => {
        this.pagination.queryWithItems = filter.query;
        return this.pagination.paginate();
      })
      .then((items) => this._response = this._makeResponseWithItems(items))
      .then(() => this.pagination.pageCount)
      .then(this._addPageCountToResponse.bind(this));
  }

  get responseDataPromise() {
    return this.list;
  }

  _configureFilter() {
    this.filter.tag = typeof this.tag === 'object' ? this.tag[0] : this.tag;
    this.filter.categoryId = this.categoryId;
    this.filter.subcategoryId = this.subcategoryId;
    this.filter.searchTerm = this.searchTerm;
    this.strategy.configureFilter(this);
  }

  _makeResponseWithItems(items) {
    if(items && items.length > 0) {
      return {items: items, categoryName: this.categoryName, categoryId: this.categoryId, subcategoryId: this.subcategoryId, tag: this.filter.tag};
    } else {
      return {items: null, categoryName: this.categoryName, categoryId: this.categoryId, subcategoryId: this.subcategoryId, tag: this.filter.tag};
    }
  }

  _addPageCountToResponse(pageCount) {
    this._response.pageCount = pageCount;
    this._response.page = this.page;
    return this._response;
  }
}

module.exports = ItemList;
