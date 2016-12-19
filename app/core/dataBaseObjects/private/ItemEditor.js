'use strict';
const ItemCreator = require('./ItemCreator');

class ItemEditor extends ItemCreator {
  constructor(dataBaseObject) {
    super(dataBaseObject);
  }

  editAndGet(fields, files) {
    this.itemData = fields;
    let editedItemPromise = new Promise((resolve, reject) => {
      this._DBschema
        .query()
        .patchAndFetchById(this.itemData)
        .then((editedItem) => {
          resolve(editedItem);
        }).catch((err) => {
          reject(err);
        });
    });
    return editedItemPromise;
  }
}

module.exports = ItemEditor;
