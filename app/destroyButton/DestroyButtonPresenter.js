'use strict';
const DestroyButtonModel = require('./DestroyButtonModel');

class DestroyButtonPresenter {
  constructor() {
    this.model = new DestroyButtonModel();
  }

  destroy(req, res, next) {
    this.model.data = req;
    this.res = res;
    this.model.destroy();
  }
}

module.exports = DestroyButtonPresenter;
