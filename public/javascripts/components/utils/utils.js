define(function (require) {
  var $ = require('jquery');

  return {
    activate: function($element) {
      $element.toggleClass('is-active', !$element.hasClass('is-active'));
    },

    deactivate: function($element) {
      $element.removeClass('is-active');
    }
  }

});