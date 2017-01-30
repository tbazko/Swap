define([
  'components/utils/utils',
  'components/Menu',
  'components/Counter',
  'components/Form',
  'dropzone'
], function (
  utils,
  Menu,
  Counter,
  Form,
  Dropzone
) {

  // var myDropzone = new Dropzone("div#dropzone", {
  //   url: '/',
  //   autoProcessQueue: false,
  //   uploadMultiple: true,
  //   parallelUploads: 100,
  //   maxFiles: 10
  // });

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
