var $ = require('jquery');
var utils = require('./utils/utils');
var swapTemplate = require('./templates/swap.html');
var Mustache = require('mustache');
var $body = $('body');
var CSSPlugin = require('../lib/plugins/cssplugin');
var EasePack = require('../lib/easing/easePack');
var TweenLite = require('../lib/TweenLite');

function SwapRequestForm() {
  this.$swapBtn = $('.js-swap-btn');
  this.$swapFormContainer = $('.js-swapFormContainer');
  this.$swapForm = this.$swapFormContainer.find('.js-swapForm');
  this.$overlayCloseBtn = $('.js-container-close');
  this.$confirmation = this.$swapFormContainer.find('.js-confirmation');
  this.$swapFormItems = this.$swapForm.find(".js-swapItems");
  this.overlay = document.querySelector('.js-overlay');
  this.form = document.querySelector('.js-swapFormContainer');
}

SwapRequestForm.prototype.init = function () {
  this.bindEvents();
}

SwapRequestForm.prototype.bindEvents = function () {
  $body.on('click', this.onBodyClick.bind(this));
  this.$swapBtn.on('click', this.onSwapBtnClick.bind(this));
  this.$swapForm.on('submit', this.onFormSubmit.bind(this));
  this.$overlayCloseBtn.on('click', this.onOverlayCloseBtnClick.bind(this));
}

SwapRequestForm.prototype.onBodyClick = function (e) {
  $(e.target).closest(this.$swapFormContainer)
}

SwapRequestForm.prototype.onSwapBtnClick = function (e) {
  e.preventDefault();
  this.getUserItemsList(e.currentTarget);
}

SwapRequestForm.prototype.onOverlayCloseBtnClick = function () {
  this.animateFormClosing();
  setTimeout(function() {
    this.closeSwapForm();
    this.resetSwapForm();
  }.bind(this), 500);
}

SwapRequestForm.prototype.onFormSubmit = function (e) {
  e.preventDefault();
  this.sendSwapRequest();
}

SwapRequestForm.prototype.closeSwapForm = function () {
  $body.removeClass('is-swapFormActivated');
  this.$confirmation.addClass('is-hidden');
  this.$swapForm.removeClass('is-hidden');
  window.scrollTo(0, 0);
}

SwapRequestForm.prototype.openSwapForm = function () {
  $body.addClass('is-swapFormActivated');
  this.animateFormOpening();
  this.$checkboxes = this.$swapForm.find('input[type="checkbox"]');
  this.$checkboxes.on('change', this.onChangeHandler.bind(this));
}

SwapRequestForm.prototype.animateFormOpening = function () {
  utils.addClass(this.overlay, 'is-active');
  this.fadeInOverlay = TweenLite.to(this.overlay, 0.4, {opacity: 1});
  this.fadeInForm = TweenLite.to(this.form, 0.1, {opacity:1});
  this.moveFormToLeft = TweenLite.to(this.form, 0.5, {x: '-100%', ease: Back.easeOut});
}

SwapRequestForm.prototype.animateFormClosing = function () {
  this.moveFormToLeft.reverse();
  TweenLite.to('.js-swapFormContainer', 0.1, {opacity:0, delay: 0.3});
  this.fadeInOverlay.reverse();
  setTimeout(function() {
    utils.removeClass(this.overlay, 'is-active');
  }.bind(this), 400)
}

SwapRequestForm.prototype.onChangeHandler = function() {
  var checked = this.$checkboxes.filter(':checked');
  if(checked.length > 0) {
    $('.js-submit-swapRequest').removeAttr('disabled');
  } else {
    $('.js-submit-swapRequest').attr('disabled', true);
  }
}

SwapRequestForm.prototype.showConfirmation = function () {
  this.$confirmation.removeClass('is-hidden');
  this.$swapForm.addClass('is-hidden');
}

// Getting user's items, putting them in template and attaching to the
// 'modal'
SwapRequestForm.prototype.getUserItemsList = function (element) {
  $.ajax({
    url: $(element).data('href'),
    method: 'GET'
  }).done(function (response) {
    if(response.redirect) {
      window.location.replace(response.redirect);
    } else if (response) {
      response.items.forEach(function (item) {
        item.firstImage = item.images[0];
        delete item.images;
      });

      var userId = parseFloat(response.items[0].user_id);
      var sellerId = $('.js-sellerId').data('seller-id');

      if (userId !== sellerId) {
        if (!this.$storedData) {
          var html = Mustache.render(swapTemplate, response);
          this.$swapFormItems.append(html);
          this.$storedData = response;
        }

        this.openSwapForm();
      } else if (response && userId === sellerId) {
        console.log('User\'s item');
      }
    }
  }.bind(this)).fail(function (jqXHR, textStatus) {
    console.log(jqXHR, textStatus);
    return false;
  });
}

SwapRequestForm.prototype.resetSwapForm = function () {
  this.$storedData = undefined;
  this.$swapFormItems.empty();
}

SwapRequestForm.prototype.sendSwapRequest = function () {
  var url = this.$swapForm.attr("action");
  var formData = {};
  var formData = this.gatherFormData(this.$swapForm);

  $.ajax({
    url: url,
    method: 'POST',
    data: formData
  }).done(function (resp) {
    if (resp.data) {
      this.showConfirmation();
    }
  }.bind(this)).fail(function (jqXHR, textStatus) {
    console.log(jqXHR, textStatus);
    return false;
  });
}

SwapRequestForm.prototype.gatherFormData = function($form) {
  var formData = {};
  $form.find('input[name]:not([type="checkbox"], [type="radio"]), textarea').each(function (index, node) {
    formData[node.name] = node.value;
  });
  $form.find(':checked, :selected').each(function (index, node) {
    var name = node.name;
    if (!formData[name]) {
      formData[name] = [];
    }
    formData[name].push(node.value);
  });

  return formData;
}

module.exports = SwapRequestForm;

