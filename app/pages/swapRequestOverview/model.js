'use strict';
const BasePageModel = rootRequire('app/pages/base/BasePageModel');
const SwapRequestOverview = rootRequire('app/swapRequest/Overview');
const Chat = rootRequire('app/Chat');

class SwapRequestOverviewModel extends BasePageModel {
  constructor() {
    super();
    this.requestId = null;
    this.currentUser = null;
    this.path = null;
    this.chatId = null;
  }

  addComponents() {
    super.addComponents();
    this._add(SwapRequestOverview);
    this.chat = this._create(Chat);
    this.chat.listen();
  }
}

module.exports = SwapRequestOverviewModel;
