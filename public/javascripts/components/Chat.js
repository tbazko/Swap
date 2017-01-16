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
    this.bindEvents();
  };

  Chat.prototype.bindEvents = function () {
    this.form.addEventListener('submit', this.onFormSubmit.bind(this));
  };

  Chat.prototype.onFormSubmit = function (e) {
    e.preventDefault();
    var text = this.textarea.value;

    if(text !== '') {
      var html = Mustache.render(messageTemplate, {text: text});
      var div = document.createElement('div');
      div.innerHTML = html;
      this.messages.insertBefore(div.firstChild, this.messages.firstChild);
      this.sendMessageToServer(text);
    }
  }

  Chat.prototype.sendMessageToServer = function (text) {
    var request = new XMLHttpRequest();
    var url = this.form.getAttribute('data-action');
    var data = JSON.stringify({'message' : text});
    request.open('POST', url, true);
    request.setRequestHeader("Content-type", "application/json");

    request.onerror = function() {
      // There was a connection error of some sort
    };

    request.send(data);
  };

  return Chat;
});
