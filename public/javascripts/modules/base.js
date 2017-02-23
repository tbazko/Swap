define([
  'jquery',
  'components/utils/utils',
  'components/Menu',
  'components/Counter',
  'components/FormValidator',
  'components/Search',
  'dropzone'
], function (
  $,
  utils,
  Menu,
  Counter,
  FormValidator,
  Search,
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
  var form = new FormValidator('js-form');
  var menu = new Menu('js-menu-wrapper', 'js-menu-trigger');
  var search = new Search();
  form.init();
  menu.init();
  search.init();
});
