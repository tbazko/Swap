define([
  'jquery',
  'components/utils/utils',
  'text!components/templates/requestListItem.html',
  'mustache',
  'components/Menu'
], function (
  $,
  utils,
  requestListItemTemplate,
  Mustache,
  Menu
) {

  var RequestCounter = function() {
    var self = {
      id: 'requestCounter',
      count: 0
    }

    self.update = function() {
      var counter = document.getElementById(self.id);
      counter.innerHTML = ++self.count;
    }

    return self;
  }

  var RequestList = function() {
    var self = {
      id: 'incomingRequests',
      initialized: true
    }

    self.addItem = function(request) {
      var incomingRequestsPane = document.getElementById(self.id);
      var requestListItem = document.createElement("div");
      requestListItem.innerHTML = Mustache.render(requestListItemTemplate, {request: request});

      if(incomingRequestsPane.firstChild) {
        incomingRequestsPane.insertBefore(requestListItem, incomingRequestsPane.firstChild);
      } else {
        incomingRequestsPane.appendChild(requestListItem);
      }
    }

    return self;
  }

  if(utils.readCookie('logged')) {
    var conversationId = utils.readCookie('logged');
    var socket = io();
    var requestList;
    var requestCounter;

    socket.on('newSwapRequest', function(data) {
      if(!requestList) {
        requestList = RequestList();
      }
      requestList.addItem(data);

      if(!requestCounter) {
        requestCounter = RequestCounter();
      }

      requestCounter.update();
    });

    socket.emit('joinRoom', conversationId);
  }

  var menu = new Menu('js-menu-wrapper', 'js-menu-trigger');
  menu.init();

});
