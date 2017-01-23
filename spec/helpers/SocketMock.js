const events = require('events');
const eventEmitter = new events.EventEmitter();
eventEmitter.to = function() {
  return this;
}

global.SocketAPImock = eventEmitter;
global.ClientSocketMock = eventEmitter;
