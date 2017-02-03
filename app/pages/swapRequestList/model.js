'use strict';
const BasePageModel = rootRequire('app/pages/base/BasePageModel');
const SwapRequestList = rootRequire('app/swapRequest/List');

class SwapRequestListModel extends BasePageModel {
  constructor() {
    super();
    this.currentUser = null;
  }

  addComponents() {
    super.addComponents();
    this._add(SwapRequestList);
  }
}

module.exports = SwapRequestListModel;
