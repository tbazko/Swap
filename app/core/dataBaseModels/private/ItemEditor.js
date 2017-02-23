'use strict';
const ItemCreator = require('./ItemCreator');

class ItemEditor extends ItemCreator {
  constructor(dataBaseObject) {
    super(dataBaseObject);
  }

  editAndGet(itemId, fields, files) {
    this.fields = fields;
    this.files = files;
    this.itemData = this.fields;

    let editedItemPromise = new Promise((resolve, reject) => {
      this._DBschema
        .query()
        .patchAndFetchById(itemId, this.itemData)
        .then((editedItem) => {
          this._DBobject.currentItem = editedItem;
          this.currentItem = editedItem;
          this.relateTags();
          if(this.files) {
            this._addItemImages();
          }
          resolve(editedItem);
        }).catch((err) => {
          console.log(err);
          reject(err);
        });
    });
    return editedItemPromise;
  }

  relateTags() {
    this.currentItem.$relatedQuery('tags').unrelate()
    .then((res) => {
      this.currentItem.$relatedQuery('swapForTags').unrelate()
      .then((res) => {
        super.relateTags();
      });
    });
  }

}

module.exports = ItemEditor;
