var utils = require('components/utils/utils');
var TabPane = require('components/TabPane');
var SwapRequestList = require('components/SwapRequestList');

var tabPane = new TabPane('requestsTabPane');
var requestList;
tabPane.init();

if(utils.readCookie('logged')) {
  window.socket.on('newSwapRequest', function(data) {
    if(!requestList) {
      requestList = new SwapRequestList();
    }
    requestList.addItem(data);
  });
}
