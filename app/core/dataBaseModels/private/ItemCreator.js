'use strict';
const cloudinary = rootRequire('config/cloudinary');
const ItemImage = rootRequire('app/core/dataBaseSchemas/ItemImage');


class ItemCreator {
  constructor(dataBaseObject) {
    this._DBschema = dataBaseObject.DataBaseSchema;
    this._DBobject = dataBaseObject;
    this._eventEmitter = dataBaseObject.eventEmitter;
  }

  set itemData(data) {
    this._itemData = {
      name: data.name,
      status: 'for_sale',
      category_id: data.category_id,
      description: data.description,
      user_id: data.userId,
      condition: data.itemCondition,
      reasonForSwap: data.reasonForSwap
    }
  }

  get itemData() {
    return this._itemData;
  }

  set files(files) {
    if(!files.upload.length && files.upload.size === 0) {
      this._files = null;
    } else if(!files.upload.length) {
      this._files = [files.upload]
    } else {
      this._files = files.upload;
    }
  }

  get files() {
    return this._files;
  }

  create(fields, files) {
    this.fields = fields;
    this.files = files;
    this.itemData = this.fields;
    let newItemPromise = new Promise((resolve, reject) => {
      this._DBschema
        .query()
        .insertAndFetch(this.itemData)
        .then((newItem) => {
          this._DBobject.currentItem = newItem;
          if(this.files) {
            this._addItemImages();
          }
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
    this.files.forEach((file, index) => {
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

  _relateTags(tags) {
    if(this.fields.tags) {
      this._DBobject.relateTags(this.fields.tags, 'tags');

      if(this.fields.swapForTags) {
        this._eventEmitter.once('allTagsAdded', () => {
          this._DBobject.relateTags(this.fields.swapForTags, 'swapForTags');
        });
      }
    } else if(this.fields.swapForTags) {
      this._DBobject.relateTags(this.fields.swapForTags, 'swapForTags');
    }
  }
}

module.exports = ItemCreator;
