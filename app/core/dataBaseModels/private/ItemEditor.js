'use strict';
const ItemCreator = require('./ItemCreator');

class ItemEditor extends ItemCreator {
  constructor(dataBaseObject) {
    super(dataBaseObject);
  }

  editAndGet(itemId, fields, files) {

    this.itemData = fields;

    let editedItemPromise = new Promise((resolve, reject) => {
      this._DBschema
        .query()
        .patchAndFetchById(itemId, this.itemData)
        .then((editedItem) => {
          console.log(2);
          resolve(editedItem);
        }).catch((err) => {
          console.log(err);
          reject(err);
        });
    });
    return editedItemPromise;
  }
}

module.exports = ItemEditor;
