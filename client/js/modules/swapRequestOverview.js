var Chat = require('../components/Chat');
var SwapRequestStatusChanger = require('../components/SwapRequestStatusChanger');

var chat = new Chat();
var state = new SwapRequestStatusChanger();
chat.init();
state.init();
