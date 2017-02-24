'use strict';
let socketAPI;
const SocketAPI = rootRequire('socketApi/private/socketAPI');

module.exports.wrapServer = function(server) {
  let socketio = require('socket.io')(server);
  if(socketAPI === undefined) {
    socketAPI = new SocketAPI(socketio);
    socketAPI.connect();
  }
};

module.exports.getInstance = function() {
  if(socketAPI) {
    return socketAPI;
  } else {
    console.log('SocketAPI is not initalized');
  }
}
