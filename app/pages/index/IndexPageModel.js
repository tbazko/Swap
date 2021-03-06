'use strict';
const BasePageModel = rootRequire('app/pages/base/BasePageModel');
const ItemList = rootRequire('app/itemList/ItemList');
const CategoryTree = rootRequire('app/CategoryTree');

class IndexPageModel extends BasePageModel {
  constructor() {
    super();
    this.itemListStrategy = null;
    this.userId = null;
    this.path = null;
    this.params = null;
    this.query = null;
  }

  addComponents() {
    super.addComponents();
    this.itemList = this._create(ItemList);
    this._add(CategoryTree);
  }
}

module.exports = IndexPageModel;
