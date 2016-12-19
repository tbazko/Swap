'use strict';
const DestroyButtonModel = require('./DestroyButtonModel');

class DestroyButtonPresenter {
  constructor() {
    this.model = new DestroyButtonModel();
  }

  destroy(req, res, next) {
    this.model.modelData = req;
    this.res = res;
  }
}

module.exports = DestroyButtonPresenter;
