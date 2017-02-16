'use strict';
const Item = require('./Item');

class ItemForm extends Item {
  constructor(pageModel) {
    super(pageModel);
    this.eventEmitter = pageModel.eventEmitter;
    this.fields = null;
    this.files = null;
  }

  handleFormData(error, fields, files) {
    if(error) this.error = error;
    this.files = files;
    this.fields = fields;
    this._formatDescription();
    this.coreInfo.then(this._handleItem.bind(this));
  }

  _handleItem(item) {
    if(item && item.user_id === this.currentUserId) {
      this._updateItem();
    } else if(!item && this.currentUserId) {
      this._createItem();
    } else {
      this.error = 'Something went wrong. Please refresh page and try again.';
    }
  }

  _formatDescription() {
    if(this.fields.description && this.fields.description != '') {
      let strippedFromHtmlText = this.fields.description.replace(/(<([^>]+)>)/ig,'');
      this.fields.description = strippedFromHtmlText.replace(/\n/g, '<br>');
    }
  }

  set error(error) {
    this._error = error;
    this.eventEmitter.emit('formError');
  }

  get error() {
    return this._error;
  }

  _createItem() {
    this.itemDataBaseModel.create(this.fields, this.files).then((newItem) => {
      this.eventEmitter.emit('formSaved', true, newItem);
    });
  }

  _updateItem() {
    this.itemDataBaseModel.editAndGet(this.itemId, this.fields, this.files).then((editedItem) => {
      this.eventEmitter.emit('formSaved', false, editedItem);
    });
  }

  get responseDataPromise() {
    if(!this.itemId) {
      return Promise.resolve({
        userId: this.currentUserId,
        newItem: 1,
        itemBelongsToCurrentUser: true
      });
    } else {
      return this.fullInfo;
    }
  }
}

module.exports = ItemForm;
