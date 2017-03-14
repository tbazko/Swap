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
    this._redirectToSamePage();
  }

  _redirectToSamePage() {
    this.res.redirect('/user/profile/items');
  }
}

module.exports = DestroyButtonPresenter;
