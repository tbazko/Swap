'use strict';
const AbstractPageModel = require('../AbstractPageModel');
const Counter = rootRequire('app/Counter');
const CurrentUrl = rootRequire('app/CurrentUrl');
const Search = rootRequire('app/Search');

class BasePageModel extends AbstractPageModel {
  constructor() {
    super();
    this.currentUserId = null;
    this.originalUrl = null;
  }

  addComponents() {
    this._add(Counter);
    this._add(CurrentUrl);
    // this.search = this._create(Search);
    // this.search.listen();
  }
}

module.exports = BasePageModel;
