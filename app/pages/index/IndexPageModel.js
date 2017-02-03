'use strict';
const BasePageModel = rootRequire('app/pages/base/BasePageModel');
const ItemList = rootRequire('app/itemList/ItemList');

class IndexPageModel extends BasePageModel {
  constructor() {
    super();
    this.itemListStrategy = null;
    this.userId = null;
    this.path = null;
    this.params = null;
  }

  addComponents() {
    super.addComponents();
    this._add(ItemList);
  }
}

module.exports = IndexPageModel;
