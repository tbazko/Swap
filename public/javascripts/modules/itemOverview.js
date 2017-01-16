define([
  'jquery',
  'components/utils/utils',
  'components/Slider',
  'components/SwapRequestForm'
], function (
  $,
  utils,
  Slider,
  SwapRequestForm
) {
  $(document).ready(function() {
    $('.js-swap-btn').on('click', function(e) {
      e.preventDefault();
      utils.activate($('.js-swapping-block'));
    });

    var slider = new Slider('.js-slider', {autoplay: false});
    var form = new SwapRequestForm();
    slider.init();
    form.init();
  });
});
