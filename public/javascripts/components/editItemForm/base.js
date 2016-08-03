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

    initialize: function() {
      this.$form = $(this.formSelector);
      this.bindEvents();
    },

    bindEvents: function() {
      this.$form.on('submit', this.formOnSubmit.bind(this));
    },

    formOnSubmit: function(e) {
      e.preventDefault();
      var url = this.$form.attr('action');
      // var formData = utils.gatherFormData(this.$form);
      var form = document.getElementById('editItemForm');
      console.log(form);
      var formData = new FormData(form);
      console.log(formData);
      $.ajax({
        url: url,
        method: 'POST',
        cache: false,
        contentType: false,
        processData: false,
        data: formData
      }).done(function(resp) {
        console.log(resp);
      }).fail(function(err) {
        console.log(err);
      });
    }
  }

  EditItemForm.initialize();

});
