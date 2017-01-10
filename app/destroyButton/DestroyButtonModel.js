'use strict';
const Item = rootRequire('app/core/dataBaseModels/Item');

class DestroyButtonModel {
  constructor() {
    this.item = new Item();
  }

  set data(req) {
    this._url = req.params.path;
    this._itemId = req.params.id;
    this._userId = req.user.id;
  }

  get itemId() {
    return this._itemId;
  }

  get userId() {
    return this._userId;
  }

  destroy() {
    this.item.getOneByIdentifier(this.itemId, this._removeFromDataBase.bind(this));
  }

  _removeFromDataBase(err, item) {
    if(item.user_id === this.userId) {
      this.item.destroy(this.itemId).then((response) => {
        console.log(response);
      });
    }
  }

}

module.exports = DestroyButtonModel;
