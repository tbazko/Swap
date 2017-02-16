define([
	'jquery',
	'components/utils/utils',
	'components/TagTransformer',
	'components/CategorySelector'
], function (
	$,
	utils,
	TagTransformer,
	CategorySelector
) {
	var EditItemForm = {
		$form: undefined,
		formSelector: '.js-editItemForm',

		initialize: function () {
			this.$form = $(this.formSelector);
			this.bindEvents();
			this.category = new CategorySelector();
			this.tags = new TagTransformer('tags');
			this.swapForTags = new TagTransformer('swapForTags');
			this.category.init();
			this.tags.init();
			this.swapForTags.init();
		},

		bindEvents: function () {
			this.$form.on('submit', this.formOnSubmit.bind(this));
		},

		formOnSubmit: function (e) {
			e.preventDefault();
			var url = this.$form.attr('action');
			var form = document.getElementById('editItemForm');
			var formData = new FormData(form);
			for (var value of formData.values()) {
			   console.log(value);
			}
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
				} else if(resp.error) {
					$('.js-item-edited').text(resp.error).removeClass('is-hidden');
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
