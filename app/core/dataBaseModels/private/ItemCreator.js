'use strict';
const cloudinary = rootRequire('config/cloudinary');

class ItemCreator {
  constructor(dataBaseObject) {
    this._DBschema = dataBaseObject.DataBaseSchema;
    this._DBobject = dataBaseObject;
  }

  set itemData(data) {
    this._itemData = {
      name: data.name,
      state: 'FOR_SALE',
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
    this._stripImageFormatRegExp = this._files.upload.name.replace(/\.jpg|\.jpeg|\.bmp|\.gif/gmi, '');
    this.itemData = this._fields;

    let newItemPromise = new Promise((resolve, reject) => {
      this._DBschema
        .query()
        .insertAndFetch(this.itemData)
        .then((newItem) => {
          this._DBobject.currentItem = newItem;
          newItem
            .$relatedQuery('images')
            .insert({id: `${newItem.id}/${this._stripImageFormatRegExp}`, item_id: newItem.id})
            .then(() => {
              cloudinary.uploader.upload(this._files.upload.path,
                function(result) {
                }, {public_id: `${newItem.id}/${this._stripImageFormatRegExp}`}
              );

              if(this._fields.tags) {
                this._DBobject.relateTags(this._fields.tags, 'tags');
              }
              if(this._fields.swapForTags) {
                this._DBobject.relateTags(this._fields.swapForTags, 'swapForTags');
              }
              resolve(newItem);
            });
        })
        .catch((err) => {
          reject(err);
        });
    });

    return newItemPromise;
  }
}

module.exports = ItemCreator;
