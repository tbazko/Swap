'use strict';
const cloudinary = rootRequire('config/cloudinary');
const ItemImage = rootRequire('app/core/dataBaseSchemas/ItemImage');
const Category = rootRequire('app/core/dataBaseModels/Category');


class ItemCreator {
  constructor(dataBaseObject) {
    this._DBschema = dataBaseObject.DataBaseSchema;
    this._DBobject = dataBaseObject;
    this._eventEmitter = dataBaseObject.eventEmitter;
  }

  set itemData(data) {
    this._itemData = {
      name: data.name,
      status: data.status || 'for_sale',
      category_id: data.category_id != 0 ? data.category_id : 10000, // 10000 - Other
      subcategory_id: data.subcategory_id != 0 ? data.subcategory_id : data.category_id != 0 ? data.category_id + 99 : 10001, // Category + 99 = 'Other', 10001 = 'Anything' in 'Other' category
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
    if (!files) {
      this._files = null;
    } else {
      this._files = files;
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
          if (this.files) {
            this._addItemImages();
          }
          this.relateTags();
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
    for (var key in this.files) {
      if (!this.files.hasOwnProperty(key)) continue;
      this.files[key].name = this._getFormattedImageName(this.files[key].name);
      this._insertItemImage(this.files[key]);
      this._uploadImageToCloudinary(this.files[key]);
    }
  }

  _getFormattedImageName(name) {
    let nameWithoutImageFormat = name.replace(/\.jpg|\.jpeg|\.bmp|\.gif|\.png/gmi, '');
    return `${this._DBobject.currentItem.id}/${nameWithoutImageFormat}`;
  }

  _insertItemImage(file) {
    ItemImage
      .query()
      .insert({ id: file.name, item_id: this._DBobject.currentItem.id })
      .then();
  }

  _uploadImageToCloudinary(file) {
    cloudinary.uploader.upload(file.path,
      function (result) {
      }, { public_id: file.name }
    );
  }

  relateTags(tags) {
    if (this.fields.tags) {
      this._DBobject.relateTags(this.fields.tags, 'tags');
      if (this.fields.swapForTags) {
        this._eventEmitter.once('allTagsAdded', () => {
          this._DBobject.relateTags(this.fields.swapForTags, 'swapForTags');
        });
      }
    } else if (this.fields.swapForTags) {
      this._DBobject.relateTags(this.fields.swapForTags, 'swapForTags');
    }
  }
}

module.exports = ItemCreator;
