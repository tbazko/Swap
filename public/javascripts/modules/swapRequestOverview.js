define([
  'components/Chat',
  'components/SwapRequestStatusChanger'
], function (
  Chat,
  SwapRequestStatusChanger
) {
	var chat = new Chat();
  var state = new SwapRequestStatusChanger();
  chat.init();
  state.init();
});
