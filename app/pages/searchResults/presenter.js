'use strict';
const formidable = require('formidable');
const BasePagePresenter = rootRequire('app/pages/base/BasePagePresenter');
const Model = require('./model');

class SearchResultsPagePresenter extends BasePagePresenter {
  constructor(options) {
    super(options);
    this.model = new Model();
  }

  parseRequest() {
    super.parseRequest();
  }

}

module.exports = SearchResultsPagePresenter;
