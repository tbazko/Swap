define([
	'jquery',
	'components/utils/utils'
], function (
	$,
	utils
) {
	var EditItemForm = {
		$form: undefined,
		formSelector: '.js-editItemForm',

		initialize: function () {
			this.$form = $(this.formSelector);
			this.bindEvents();
		},

		bindEvents: function () {
			this.$form.on('submit', this.formOnSubmit.bind(this));
		},

		formOnSubmit: function (e) {
			e.preventDefault();
			var url = this.$form.attr('action');
			var form = document.getElementById('editItemForm');
			var formData = new FormData(form);

			$.ajax({
				url: url,
				method: 'POST',
				cache: false,
				contentType: false,
				processData: false,
				data: formData
			}).done(function (resp) {
				if (resp.isNewItem) {
					$('.js-item-added').removeClass('is-hidden');
				} else {
					$('.js-item-edited').removeClass('is-hidden');
				}
			}).fail(function (err) {
				console.log(err);
			});
		}
	}

	EditItemForm.initialize();

});
