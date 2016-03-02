define(function (require) {
  var $ = require('jquery'),
      utils = require('components/utils/utils');

  $(document).ready(function() {
    $('.js-swap-btn').on('click', function(e) {
      e.preventDefault();
      utils.activate($('.js-swapping-block'));
    });
  });

});