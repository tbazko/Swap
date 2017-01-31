'use strict';
const AbstractPageModel = require('../AbstractPageModel');
const Counter = rootRequire('app/counter/Counter');

class BasePageModel extends AbstractPageModel {
  constructor() {
    super();
    this.userId = null;
  }

  addComponents() {
    this._add(Counter);
  }
}

module.exports = BasePageModel;
