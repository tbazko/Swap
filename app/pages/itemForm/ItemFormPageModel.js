'use strict';
const events = require('events');
const BasePageModel = rootRequire('app/pages/base/BasePageModel');
const ItemForm = rootRequire('app/item/ItemForm');

class ItemFormPageModel extends BasePageModel {
  constructor() {
    super();
    this.itemId = null;
    this.eventEmitter = new events.EventEmitter();
  }

  addComponents() {
    super.addComponents();
    this.itemForm = this._create(ItemForm);
  }

  handleFormData(error, fields, files) {
    this.itemForm.handleFormData(error, fields, files);
  }

}

module.exports = ItemFormPageModel;
