var $ = require('jquery');
var Slider = require('../components/Slider');
var SwapRequestForm = require('../components/SwapRequestForm');
var FormValidator = require('../components/FormValidator');

$(document).ready(function () {
  $('.js-swap-btn').on('click', function (e) {
    e.preventDefault();
    $('.js-swapping-block').toggleClass('is-active', !$('.js-swapping-block').hasClass('is-active'));
  });

  var slider = new Slider('.js-slider', { autoplay: false });
  var form = new SwapRequestForm();
  var validator = new FormValidator('js-form');
  validator.init();
  slider.init();
  form.init();
});
