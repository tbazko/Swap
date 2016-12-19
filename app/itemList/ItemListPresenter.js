'use strict';
const ItemListModel = require('./ItemListModel');

class ItemListPresenter {
  constructor(strategy) {
    this.model = new ItemListModel(strategy);
    this.template = strategy.template;
    this.model.addObserver(this._onModelChange.bind(this));
  }

  handle(req, res, next) {
    this.res = res;
    this.next = next;
    this.model.modelData = req;
  }

  _onModelChange() {
    this.model.items.then((response) => {
      if(this.model.method === 'GET') {
        this._renderInView(response);
      }

      if(this.model.method === 'POST') {
        this._sendToView(response);
      }
    });
  }

  _renderInView(response) {
    this.res.render(this.template, response);
  }

  _sendToView(response) {
    this.res.send(response);
  }
}

module.exports = ItemListPresenter;
