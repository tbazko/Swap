'use strict';
const events = require('events');
const eventEmitter = new events.EventEmitter();
const Item = rootRequire('app/core/dataBaseObjects/Item');

class ItemFormModel {
  constructor() {
    this._observerList = [];
    this._itemObjection = new Item();
    this.eventEmitter = eventEmitter;
  }

  set itemId(itemId) {
    this._itemId = itemId
  }

  set modelData(req) {
    this._path = req.path;
    this._user = req.user ? req.user : false;
    this._itemId = req.params && req.params.id;
    this.method = req.method;
  }

  set method(method) {
    this._method = method;
    this.eventEmitter.emit('methodChanged');
  }

  set parsedFormData(data) {
    this._files = data.files;
    this._fields = data.fields;
    if(this._fields.newItem === '1') {
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

  get fields() {
    return this._fields;
  }

  get files() {
    return this._files;
  }

  get method() {
    return this._method;
  }

  get itemId() {
    return this._itemId;
  }

  get user() {
    return this._user;
  }

  get path() {
    return this._path;
  }

  get item() {
    let itemPromise = new Promise((resolve, reject) => {
      this._itemObjection
        .getWithRelations(this.itemId, 'images', function(err, item) {
          if(item) {
            resolve(item[0]);
          } else if(err) {
            reject(err);
          } else {
            resolve(false);
          }
        });
    });
    return itemPromise;
  }

  _createItem() {
    this._itemObjection.createAndGet(this.fields, this.files).then((newItem) => {
      this.eventEmitter.emit('formSaved', true, newItem);
    });
  }

  _updateItem() {
    this._itemObjection.editAndGet(this.fields, this.fields).then((editedItem) => {
      this.eventEmitter.emit('formSaved', false, editedItem);
    });
  }
}

module.exports = ItemFormModel;
