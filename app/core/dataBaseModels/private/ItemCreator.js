'use strict';
const cloudinary = rootRequire('config/cloudinary');
const ItemImage = rootRequire('app/core/dataBaseSchemas/ItemImage');

class ItemCreator {
  constructor(dataBaseObject) {
    this._DBschema = dataBaseObject.DataBaseSchema;
    this._DBobject = dataBaseObject;
  }

  set itemData(data) {
    this._itemData = {
      name: data.name,
      status: 'for_sale',
      description: data.description,
      user_id: data.userId,
      condition: data.itemCondition
    }
  }

  get itemData() {
    return this._itemData;
  }

  create(fields, files) {
    this._fields = fields;
    this._files = files;
    this.itemData = this._fields;
    console.log(this.itemData);
    let newItemPromise = new Promise((resolve, reject) => {
      this._DBschema
        .query()
        .insertAndFetch(this.itemData)
        .then((newItem) => {
          console.log(newItem);
          this._DBobject.currentItem = newItem;
          this._addItemImages();
          this._relateTags();
          resolve(this._DBobject.currentItem);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
    return newItemPromise;
  }

  _addItemImages() {
    this._files.upload.forEach((file, index) => {
      file.name = this._getFormattedImageName(file.name);
      this._insertItemImage(file);
      this._uploadImageToCloudinary(file);
    });
  }

  _getFormattedImageName(name) {
    let nameWithoutImageFormat = name.replace(/\.jpg|\.jpe§g|\.bmp|\.gif/gmi, '');
    return `${this._DBobject.currentItem.id}/${nameWithoutImageFormat}`;
  }

  _insertItemImage(file) {
    ItemImage
      .query()
      .insert({id: file.name, item_id: this._DBobject.currentItem.id})
      .then();
  }

  _uploadImageToCloudinary(file) {
    cloudinary.uploader.upload(file.path,
      function(result) {
      }, {public_id: file.name}
    );
  }

  _relateTags() {
    if(this._fields.tags) {
      this._DBobject.relateTags(this._fields.tags, 'tags');
    }
    if(this._fields.swapForTags) {
      this._DBobject.relateTags(this._fields.swapForTags, 'swapForTags');
    }
  }
}

module.exports = ItemCreator;
