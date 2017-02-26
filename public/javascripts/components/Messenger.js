define(function (require) {
  var $ = require('jquery');
  var utils = require('components/utils/utils');
  var messageTemplate = require('text!components/templates/message.html');
  var Mustache = require('mustache');

  var Messenger = {
    formContainer: '.js-messageForm',
    textArea: '.js-messageTextarea',
    button: '.js-messageSubmit',

    initialize: function() {
      this.$formContainer = $(this.formContainer);
      this.$form = this.$formContainer.find('form');
      this.$textArea = $(this.textArea);
      this.$button = $(this.button);

      this.bindEvents();
    },

    bindEvents: function() {
      this.$form.on('submit', this.onFormSubmit.bind(this));
    },

    onFormSubmit: function(e) {
      e.preventDefault();
      var url = this.$form.attr('action');
      var text = this.$textArea.val();
      console.log(url);
      if(text !== '') {
        var html = Mustache.render(messageTemplate, {text: text});
        this.$formContainer.after(html);

        $.ajax({
          url: url,
          type: 'POST',
          data: {'message' : text},
          dataType: 'json',
          success: function() {
            console.log('sent');
          }
        });
      }
    }
  }

  Messenger.initialize();

});
