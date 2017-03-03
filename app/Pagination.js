'use strict';
const clone = require('clone');
const knex = rootRequire('config/database').knex;
const objection = require('objection');
const ItemSchema = rootRequire('app/core/dataBaseSchemas/Item');

class Pagination {
  constructor(data) {
    this.queryWithItems = null;
    this.currentPage = data.page || 1;
    this.pageSize = data.pageSize || 100;
    this.start = this.getStart();
  }

  get numberOfRows() {
    return this.queryWithItemsWithoutLimit.count('id as numberOfRows');
  }

  get pageCount() {
    return this.numberOfRows.then((response) => {
      return Math.ceil(response[0].numberOfRows / this.pageSize);
    });
  }

  getStart() {
    if(this.currentPage > 1){
      return (this.currentPage - 1) * this.pageSize;
    } else {
      return 0;
    }
  }

  paginate() {
    this.queryWithItemsWithoutLimit = clone(this.queryWithItems);
    return this.queryWithItems.limit(this.pageSize).offset(this.start);

  }

  limit() {
    this.queryWithItems = this.queryWithItems.limit(this.pageSize);
    return this;
  }

  offset() {
    this.queryWithItems = this.queryWithItems.offset(this.start);
    return this;
  }

  then(successHandler, errorHandler) {
    return this.queryWithItems.then(successHandler, errorHandler);
  }
}

module.exports = Pagination;