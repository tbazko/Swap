define([
  'components/utils/utils',
  'components/TabPane',
  'components/SwapRequestList'
], function (
  utils,
  TabPane,
  SwapRequestList
) {
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
});
