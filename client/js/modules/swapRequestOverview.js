var FormValidator = require('../components/FormValidator');
var Chat = require('../components/Chat');
var SwapRequestStatusChanger = require('../components/SwapRequestStatusChanger');

var chat = new Chat();
var state = new SwapRequestStatusChanger();
var form = new FormValidator();
chat.init();
state.init();
form.init();