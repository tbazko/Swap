'use strict';

class SocketAPI {
  constructor(api) {
    this._socketAPI = api;
    this._socketListeners = {};
  }

  connect() {
    this._socketAPI.on('connection', this.listenToClient.bind(this));
  }

  listenToClient(socket) {
    this.socket = socket;
    this.socket.on('joinRoom', this.joinRoom.bind(this));
    for (var key in this._socketListeners) {
      // skip loop if the property is from prototype
      if (!this._socketListeners.hasOwnProperty(key)) continue;
      this.socket.on(key, this._socketListeners[key]);
    }
  }

  joinRoom(id) {
    this.socket.join(id);
  }

  on(customEvent, callback) {
    this._socketListeners[customEvent] = callback;
  }

  emit(customEvent, data) {
    let customData = data || undefined;
    this._socketAPI.emit(customEvent, customData);
  }

  to(chatId) {
    this._socketAPI = this._socketAPI.to(chatId);
    return this;
  }
}

module.exports = SocketAPI;
