'use strict';
const BasePageModel = rootRequire('app/pages/base/BasePageModel');
const Item = rootRequire('app/item/Item');

class ItemPageModel extends BasePageModel {
  constructor() {
    super();
    this.itemId = null;
    this.currentUserId = undefined;
  }

  addComponents() {
    console.log(this.currentUserId);
    super.addComponents();
    this._add(Item);
  }
}

module.exports = ItemPageModel;
