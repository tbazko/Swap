"use strict";
let _socketio;

module.exports.getSocketio = function() {
  return _socketio;
}

module.exports.setSocketio = function(io) {
  _socketio = io;
  _socketio.on('connection', handleClient);
}

function handleClient(socket) {
  socket.on('joinRoom', function(id) {
    console.log('joining room', id);
    socket.join(id);
  });
}
