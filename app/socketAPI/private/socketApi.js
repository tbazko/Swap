'use strict';

class SocketAPI {
  constructor(api) {
    this._socketAPI = api;
  }

  connect() {
    this._socketAPI.on('connection', this.listenToClient.bind(this));
  }

  listenToClient(socket) {
    this.socket = socket;
    this.socket.on('joinRoom', this.joinRoom.bind(this));
  }

  joinRoom(id) {
    this.socket.join(id);
  }

  emit(customEvent, data) {
    let customData = data || undefined;
    this.socket.emit(customEvent, customData);
  }

  to(chatId) {
    this.socket = this.socket.to(chatId);
    return this;
  }
}

module.exports = SocketAPI;
