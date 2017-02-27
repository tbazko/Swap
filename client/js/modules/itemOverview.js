var $ = require('jquery');
var utils = require('../components/utils/utils');
var Slider = require('../components/Slider');
var SwapRequestForm = require('../components/SwapRequestForm');
var FormValidator = require('../components/FormValidator');

$(document).ready(function () {
  $('.js-swap-btn').on('click', function (e) {
    e.preventDefault();
    utils.activate($('.js-swapping-block'));
  });

  var slider = new Slider('.js-slider', { autoplay: false });
  var form = new SwapRequestForm();
  var validator = new FormValidator('js-form');
  validator.init();
  slider.init();
  form.init();
});
