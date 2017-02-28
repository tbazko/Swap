'use strict';
const ItemCreator = require('./ItemCreator');
const Image = rootRequire('app/core/dataBaseSchemas/ItemImage');
const cloudinary = rootRequire('config/cloudinary');

class ItemEditor extends ItemCreator {
  constructor(dataBaseObject) {
    super(dataBaseObject);
  }

  set imagesToDelete(imagesIds) {
    if(imagesIds) {
      this._imagesToDelete = this._DBobject.uniqueArray(imagesIds.split(','));
    }
  }

  get imagesToDelete() {
    return this._imagesToDelete;
  }

  editAndGet(itemId, fields, files) {
    this.fields = fields;
    this.files = files;
    this.itemData = this.fields;
    this.imagesToDelete = this.fields.imagesToDelete;

    let editedItemPromise = new Promise((resolve, reject) => {
      this._DBschema
        .query()
        .patchAndFetchById(itemId, this.itemData)
        .then((editedItem) => {
          this._DBobject.currentItem = editedItem;
          this.currentItem = editedItem;
          this.relateTags();
          if(this.imagesToDelete) {
            this.deleteImages();
          }
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

  deleteImages() {

    Image
      .query()
      .delete()
      .where((builder) => {
        this.imagesToDelete.forEach((imageId, index) => {
          console.log(imageId);
          if(index === 0) {
            builder.where('id', imageId);
          } else {
            builder.orWhere('id', imageId);
          }
        });
      })
      .then((numberOfDeletedRows) => {
        console.log('removed', numberOfDeletedRows, 'images');
      }).catch((err) => console.log(err));

    this.imagesToDelete.forEach((imageId) => {
      cloudinary.uploader.destroy(imageId);
    });
  }

}

module.exports = ItemEditor;
