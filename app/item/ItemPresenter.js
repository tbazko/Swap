'use strict';
const ItemModel = require('./ItemModel');

class ItemPresenter {
  constructor() {
    this.template = 'itemView';
    this.model = new ItemModel();
  }

  handle(req, res, next) {
    this.model.url = req.path;
    this.model.id = req.params.id;
    this.req = req;
    this.res = res;
    this._renderView();
  }

  _renderView() {
    this.model.fullInfo.then((response) => {
      let authorIsCurrentUser = false;
      if(this.req.user && this.req.user.id === response.user.id) {
        authorIsCurrentUser = true;
      }
      this.res.render(this.template, {item: response, author: response.user, itemImage: response.images, authorIsCurrentUser: authorIsCurrentUser});
    }).catch((err) => this._handleError(err));
  }

  _handleError(err) {
    if(err === null) {
      this.res.redirect('/');
      return this.res.end();
    }

    this.res.status(err.status || 500);
    this.res.render('error', {
      message: err,
      error: {}
    });
  }

}

module.exports = ItemPresenter;
