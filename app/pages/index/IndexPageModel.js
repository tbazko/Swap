'use strict';
const BasePageModel = rootRequire('app/pages/base/BasePageModel');
const ItemList = rootRequire('app/itemList/ItemList');

class IndexPageModel extends BasePageModel {
  constructor() {
    super();
    this.itemListStrategy = null;
  }

  addComponents() {
    super.addComponents();
    this._add(ItemList);
  }
}

module.exports = IndexPageModel;
