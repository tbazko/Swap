define([
  'jquery',
  'components/utils/utils'
], function (
  $,
  utils,
  Messenger
) {
  $(document).ready(function() {
    $('.js-swap-btn').on('click', function(e) {
      e.preventDefault();
      utils.activate($('.js-swapping-block'));
    });
  });

});
