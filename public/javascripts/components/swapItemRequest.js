define([
	'jquery',
	'components/utils/utils',
	'text!components/templates/swap.html',
	'mustache'
], function (
	$,
	utils,
	swapTemplate,
	Mustache
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

		initialize: function () {
			this.$swapBtn = $('.js-swap-btn');
			this.$swapOverlay = $('.js-swapContainer');
			this.$swapForm = this.$swapOverlay.find('.js-swapForm');
			this.$overlayCloseBtn = $('.js-container-close');
			this.$confirmationOverlay = this.$swapOverlay.siblings('.js-confirmation-container');
			this.$swapFormItems = this.$swapForm.find(".js-swapItems");
			this.bindEvents();
		},

		bindEvents: function () {
			$body.on('click', this.onBodyClick.bind(this));
			this.$swapBtn.on('click', this.onSwapBtnClick.bind(this));
			this.$swapForm.on('submit', this.onFormSubmit.bind(this));
			this.$overlayCloseBtn.on('click', this.onOverlayCloseBtnClick.bind(this));
		},

		onBodyClick: function (e) {
			$(e.target).closest(this.$swapOverlay)
		},

		onSwapBtnClick: function(e) {
			e.preventDefault();
			this.getUserItemsList(e.currentTarget);
		},

		onOverlayCloseBtnClick: function () {
			this.closeOverlay();
		},

		onFormSubmit: function (event) {
			event.preventDefault();
			this.sendSwapRequest();
		},

		closeOverlay: function () {
			this.$activeOverlay.addClass('is-hidden');
			$body.removeClass('is-blurred');
			window.scrollTo(0, 0);
		},

		showOverlay: function () {
			$body.addClass('is-blurred');
			var top = this.$activeOverlay.offset().top;
			window.scrollTo(0, top - 100);
		},

		// Scrolls to the swap container (overlay) with swap form
		openSwapOverlay: function () {
			this.$activeOverlay = this.$swapOverlay;
			this.$swapOverlay.removeClass('is-hidden');
			this.showOverlay();
		},

		openConfirmationOverlay: function () {
			this.$activeOverlay = this.$confirmationOverlay;
			this.$confirmationOverlay.removeClass('is-hidden');
			this.showOverlay();
		},

		// Getting user's items, putting them in template and attaching to the
		// 'modal'
		getUserItemsList: function (element) {
			$.ajax({
				url: $(element).data('href'),
				method: 'POST'
			}).done(function (response) {
				console.log(response);
				if (response) {

					var userId = parseFloat(response.user.userId);
					var authorId = $('.js-authorId').data('author-id');

					if (userId !== authorId) {
						if (!this.$storedData || this.$storedData.length !== response.data.length) {
							var html = Mustache.render(swapTemplate, response);
							this.$swapFormItems.append(html);
							this.$storedData = response.data;
						}

						this.openSwapOverlay();
					} else if (response && userId === authorId) {
						console.log('User\'s product');
					}
				} else {
					// TODO: Remove later
					window.location.replace('http://localhost:3000/account/signin');
				}
			}.bind(this)).fail(function (jqXHR, textStatus) {
				console.log(jqXHR, textStatus);
				return false;
			});
		},

		resetSwapForm: function () {
			this.$storedData = undefined;
			this.$swapFormItems.empty();
		},

		sendSwapRequest: function () {
			var url = this.$swapForm.attr("action");
			var formData = {};
			var formData = utils.gatherFormData(this.$swapForm);
			formData['authorId'] = $('.js-productDetails').find('.js-authorId').data('author-id');
			$.ajax({
				url: url,
				method: 'POST',
				data: formData
			}).done(function (resp) {
				if (resp.data) {
					this.closeOverlay();
					this.openConfirmationOverlay();
					this.resetSwapForm();
				}
			}.bind(this)).fail(function (jqXHR, textStatus) {
				console.log(jqXHR, textStatus);
				return false;
			});
		}
	}

	SwapItemRequest.initialize();
});
