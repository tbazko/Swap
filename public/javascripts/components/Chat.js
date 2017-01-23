define([
  'components/utils/utils',
  'text!components/templates/message.html',
  'mustache'
], function (
  utils,
  messageTemplate,
  Mustache
) {
  function Chat() {
    this.form = document.getElementById('messageForm');
    this.textarea = document.getElementById('messageTextarea');
    this.submitButton = document.getElementById('messageSubmit');
    this.messages = document.getElementById('messages');
  }

  Chat.prototype.init = function () {
    if(this.form) {
      window.socket.emit('joinRoom', location.pathname);
      this.bindEvents();
    }
  };

  Chat.prototype.bindEvents = function () {
    this.form.addEventListener('submit', this.onFormSubmit.bind(this));
    window.socket.on('chatMessage', this.renderMessage.bind(this));
  };

  Chat.prototype.onFormSubmit = function (e) {
    e.preventDefault();
    var text = this.textarea.value;
    if(text !== '') {
      this.textarea.value = '';
      window.socket.emit('chatMessage', text);
    }
  }

  Chat.prototype.renderMessage = function (data) {
    if(data.text !== '') {
      var currentUserId = utils.readCookie('logged');
      if(parseFloat(currentUserId) === data.senderId) {
        data.senderName = false; // Will be replaced by 'Me' in template
      }
      var html = Mustache.render(messageTemplate, {message: data});
      var div = document.createElement('div');
      div.innerHTML = html;
      this.messages.insertBefore(div.firstChild, this.messages.firstChild);
    }
  };

  return Chat;
});
