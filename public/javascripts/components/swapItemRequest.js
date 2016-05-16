define([
  'jquery',
  'components/utils/utils',
  'templates/swap'
], function (
  $,
  utils,
  swapTemplate
) {

  var SwapItemRequest = {
    $swapBtn: undefined,
    $swapForm: undefined,

    bindEvents: function() {
      this.$swapBtn.on('click', this.onSwapBtnClick.bind(this));
      this.$swapForm.on('submit', this.onFormSubmit.bind(this));
    },

    onSwapBtnClick: function() {
      this.focusOnSwapContainer();
      this.getUserItemsList();
    },

    onFormSubmit: function(event) {
      event.preventDefault();
      this.sendSwapRequest();
    },

    initialize: function() {
      this.$swapBtn = $('.js-swap-btn');
      this.$swapForm = $('.js-swapForm');

      this.bindEvents();
      // For testing
      this.$swapBtn.trigger('click');
    },

    // Scrolls to the swap container ('modal') with swap form
    focusOnSwapContainer: function() {
      $('.js-swapContainer').removeClass('is-hidden');
      $('body').addClass('is-blurred');
      var top = $('.js-swapContainer').offset().top;
      window.scrollTo(0, top - 100);
    },

    // Getting user's items, putting them in template and attaching to the
    // 'modal'
    getUserItemsList: function() {
      $.ajax({
        url: '/account/is-authenticated',
        method: 'POST'
      }).done(function(resp) {
        var userId = resp ? parseFloat(resp.user.userId) : false;
        var authorId = $('.js-authorId').data('author-id');
        resp.data.email = resp.user.email;

        if(resp && userId !== authorId) {
          var html = swapTemplate(resp.data);
          $(".js-swapItem").append(html);
        } else if(resp && userId === authorId) {
          console.log('User product');
        } else {
          // TODO: Remove later
          window.location.replace('http://localhost:3000/account/signin');
        }
      }).fail(function(jqXHR, textStatus) {
        console.log(jqXHR, textStatus);
      });
    },

    sendSwapRequest: function() {
      var url = this.$swapForm.attr("action");
      var formData = {};
      this.$swapForm.find('input[name]:not([type="checkbox"])').each(function (index, node) {
        formData[node.name] = node.value;
      });
      this.$swapForm.find(':checked').each(function(index, node) {
        var name = node.name + '[]';
        if(!formData[name]) {
          formData[name] = [];
        }
        formData[name].push(node.value);
      });
      console.log(url);
      console.log(formData);

      $.ajax({
        url: url,
        method: 'POST',
        data: formData
      }).done(function(resp) {
        console.log(resp);
      }).fail(function(jqXHR, textStatus) {
        console.log(jqXHR, textStatus);
      });
    }
  }

  SwapItemRequest.initialize();
});
