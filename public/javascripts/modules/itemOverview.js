define([
  'jquery',
  'components/utils/utils',
  'components/slider'
], function (
  $,
  utils,
  Slider
) {
  $(document).ready(function() {
    $('.js-swap-btn').on('click', function(e) {
      e.preventDefault();
      utils.activate($('.js-swapping-block'));
    });

    var slider = new Slider('.js-slider', {autoplay: false});
    slider.init();

  });

});
