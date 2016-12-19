'use strict';
const Item = rootRequire('app/core/dataBaseObjects/Item');

class ItemModel {
  set id(id) {
    this._id = id;
  }

  set url(url) {
    this._url = url;
  }

  get id() {
    return this._id;
  }

  get url() {
    return this._url;
  }

  get fullInfo() {
    let item = new Item();
    let fullInfoPromise = new Promise((resolve, reject) => {
      item
        .getWithRelations(this.id, '[user.[items], images, tags, swapForTags]', (err, items) => {
          if(err) {
            reject(err);
          }
          if(!!items.length) {
            resolve(items[0]);
          } else {
            reject(null);
          }
        });
    });
    return fullInfoPromise;
  }
}

module.exports = ItemModel;
