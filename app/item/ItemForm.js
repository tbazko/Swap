'use strict';
const Item = rootRequire('app/core/dataBaseModels/Item');

class ItemForm {
  constructor(pageModel) {
    this._itemObjection = new Item();
    this.eventEmitter = pageModel.eventEmitter;
    this.user = pageModel.user;
    this.path = pageModel.path;
    this.itemId = pageModel.itemId;
    this.fields = null;
    this.files = null;
  }

  handleFormData(error, fields, files) {
    if(error) this.error = error;
    this.files = files;
    this.fields = fields;
    let strippedFromHtmlText = this.fields.description.replace(/(<([^>]+)>)/ig,'');
    this.fields.description = strippedFromHtmlText.replace(/\n/g, '<br>')
    if(this.fields.newItem === '1') {
      this._createItem();
    } else {
      this._updateItem();
    }
  }

  set error(error) {
    this._error = error;
    this.eventEmitter.emit('formError');
  }

  get error() {
    return this._error;
  }

  get item() {
    let itemPromise = new Promise((resolve, reject) => {
      this._itemObjection
        .getWithRelations(this.itemId, 'images', function(err, item) {
          if(item) {
            resolve({item: item[0]});
          } else if(err) {
            reject(err);
          } else {
            resolve(false);
          }
        });
    });
    return itemPromise;
  }

  get responseDataPromise() {
    return this.item;
  }

  _createItem() {
    this._itemObjection.create(this.fields, this.files).then((newItem) => {
      this.eventEmitter.emit('formSaved', true, newItem);
    });
  }

  _updateItem() {
    this._itemObjection.editAndGet(this.itemId, this.fields, this.files).then((editedItem) => {
      this.eventEmitter.emit('formSaved', false, editedItem);
    });
  }
}

module.exports = ItemForm;
