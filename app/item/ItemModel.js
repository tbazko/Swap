'use strict';
const Item = rootRequire('app/core/dataBaseModels/Item');

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
            console.log(items[0].description.match(/\n/g));
            let text = items[0].description;
            items[0].description = text.replace(/\n/g, '<br>');
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
