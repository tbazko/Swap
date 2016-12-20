'use strict';
const Item = rootRequire('app/core/dataBaseModels/Item');

class DestroyButtonModel {
  set data(req) {
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
    let itemDataBaseObject = new Item();
    itemDataBaseObject.getOneByIdentifier(this.itemId, (err, item) => {
      if(item.user_id === this.userId) {
        itemDataBaseObject.destroy(this.itemId).then((response) => {
          console.log(response);
        });
      }
    });
  }
}

module.exports = DestroyButtonModel;
