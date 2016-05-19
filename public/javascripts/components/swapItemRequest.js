define([
  'jquery',
  'components/utils/utils',
  'templates/swap'
], function (
  $,
  utils,
  swapTemplate
) {

  var $body = $('body');

  var SwapItemRequest = {
    $swapBtn: undefined,
    $swapForm: undefined,
    $overlayCloseBtn: undefined,
    $storedData: undefined,
    $swapOverlay: undefined,
    $confirmationOverlay: undefined,
    $activeOverlay: undefined,

    initialize: function() {
      this.$swapBtn = $('.js-swap-btn');
      this.$swapOverlay = $('.js-swapContainer');
      this.$swapForm = this.$swapOverlay.find('.js-swapForm');
      this.$overlayCloseBtn = $('.js-container-close');
      this.$confirmationOverlay = this.$swapOverlay.siblings('.js-confirmation-container');
      this.$swapFormItems = this.$swapForm.find(".js-swapItems");
      this.bindEvents();
    },

    bindEvents: function() {
      $body.on('click', this.onBodyClick.bind(this));
      this.$swapBtn.on('click', this.onSwapBtnClick.bind(this));
      this.$swapForm.on('submit', this.onFormSubmit.bind(this));
      this.$overlayCloseBtn.on('click', this.onOverlayCloseBtnClick.bind(this));
    },

    onBodyClick: function(e) {
      $(e.target).closest(this.$swapOverlay)
    },

    onSwapBtnClick: function() {
      this.getUserItemsList();
    },

    onOverlayCloseBtnClick: function() {
      this.closeOverlay();
    },

    onFormSubmit: function(event) {
      event.preventDefault();
      this.sendSwapRequest();
    },

    closeOverlay: function() {
      this.$activeOverlay.addClass('is-hidden');
      $body.removeClass('is-blurred');
      window.scrollTo(0, 0);
    },

    showOverlay: function() {
      $body.addClass('is-blurred');
      var top = this.$activeOverlay.offset().top;
      window.scrollTo(0, top - 100);
    },

    // Scrolls to the swap container (overlay) with swap form
    openSwapOverlay: function() {
      this.$activeOverlay = this.$swapOverlay;
      this.$swapOverlay.removeClass('is-hidden');
      this.showOverlay();
    },

    openConfirmationOverlay: function() {
      this.$activeOverlay = this.$confirmationOverlay;
      this.$confirmationOverlay.removeClass('is-hidden');
      this.showOverlay();
    },

    // Getting user's items, putting them in template and attaching to the
    // 'modal'
    getUserItemsList: function() {
      $.ajax({
        url: '/account/is-authenticated',
        method: 'POST'
      }).done(function(response) {

        if(response) {
          var userId = parseFloat(response.user.userId);
          var authorId = $('.js-authorId').data('author-id');

          if(userId !== authorId) {
            if(!this.$storedData || this.$storedData.length !== response.data.length) {
              var html = swapTemplate(response);
              this.$swapFormItems.append(html);
              this.$storedData = response.data;
            }

            this.openSwapOverlay();
          } else if(response && userId === authorId) {
            console.log('User\'s product');
          }
        } else {
          // TODO: Remove later
          window.location.replace('http://localhost:3000/account/signin');
        }
      }.bind(this)).fail(function(jqXHR, textStatus) {
        console.log(jqXHR, textStatus);
        return false;
      });
    },

    resetSwapForm: function() {
      this.$storedData = undefined;
      this.$swapFormItems.empty();
    },

    sendSwapRequest: function() {
      var url = this.$swapForm.attr("action");
      var formData = {};
      this.$swapForm.find('input[name]:not([type="checkbox"]), textarea').each(function (index, node) {
        formData[node.name] = node.value;
      });
      this.$swapForm.find(':checked').each(function(index, node) {
        var name = node.name;
        if(!formData[name]) {
          formData[name] = [];
        }
        formData[name].push(node.value);
      });
      formData['authorId'] = $('.js-productDetails').find('.js-authorId').data('author-id');

      $.ajax({
        url: url,
        method: 'POST',
        data: formData
      }).done(function(resp) {
        console.log(resp);
        if(resp.data) {
          this.closeOverlay();
          this.openConfirmationOverlay();
          this.resetSwapForm();
        }
      }.bind(this)).fail(function(jqXHR, textStatus) {
        console.log(jqXHR, textStatus);
        return false;
      });
    }
  }

  SwapItemRequest.initialize();
});
