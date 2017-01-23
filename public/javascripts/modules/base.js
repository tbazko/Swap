define([
  'components/utils/utils',
  'components/Menu',
  'components/Counter',
  'components/Form'
], function (
  utils,
  Menu,
  Counter,
  Form
) {
  if(utils.readCookie('logged')) {
    var userId = utils.readCookie('logged');
    window.socket = io();
    var socket = window.socket;
    var counter;

    socket.on('newSwapRequest', function(data) {
      if(!counter) {
        counter = new Counter();
      }
      counter.update();
    });

    socket.emit('joinRoom', userId);
  }

  var menu = new Menu('js-menu-wrapper', 'js-menu-trigger');
  menu.init();
});
