  var readCookie = require('../components/utils/utils').readCookie;
  var Menu = require('../components/Menu');
  var Counter = require('../components/Counter');

  if(readCookie('logged')) {
    var userId = readCookie('logged');
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