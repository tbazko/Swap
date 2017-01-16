define([
  'components/utils/utils',
  'components/Menu',
  'components/Counter',
  'components/SwapRequestList',
], function (
  utils,
  Menu,
  Counter,
  SwapRequestList
) {
  if(utils.readCookie('logged')) {
    var conversationId = utils.readCookie('logged');
    window.socket = io();
    var socket = window.socket;
    var requestList;
    var counter;

    socket.on('newSwapRequest', function(data) {
      if(!requestList) {
        requestList = new SwapRequestList();
      }
      requestList.addItem(data);

      if(!counter) {
        counter = new Counter();
      }
      counter.update();
    });

    socket.on('chatMessage', function(data) {
      if(!counter) {
        counter = new Counter();
      }
      counter.update();
    });

    socket.emit('joinRoom', conversationId);
  }

  var menu = new Menu('js-menu-wrapper', 'js-menu-trigger');
  menu.init();

});
