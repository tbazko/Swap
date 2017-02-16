'use strict';
const events = require('events');
const BasePageModel = rootRequire('app/pages/base/BasePageModel');
const ItemForm = rootRequire('app/item/ItemForm');
const CategoryTree = rootRequire('app/CategoryTree');

class ItemFormPageModel extends BasePageModel {
  constructor() {
    super();
    this.itemId = null;
    this.eventEmitter = new events.EventEmitter();
  }

  addComponents() {
    super.addComponents();
    this._add(CategoryTree);
    this.itemForm = this._create(ItemForm);
  }

  handleFormData(error, fields, files) {
    this.itemForm.handleFormData(error, fields, files);
  }

  get error() {
    return this.itemForm.error;
  }
}

module.exports = ItemFormPageModel;
