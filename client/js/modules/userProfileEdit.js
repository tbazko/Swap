var $ = require('jquery');
var FormValidator = require('../components/FormValidator');
var PlacesAutoComplete = require('../components/PlacesAutoComplete');

var p = new PlacesAutoComplete('autocomplete');
var form = new FormValidator();
form.init();
p.options = {
  types: ['geocode'],
  componentRestrictions: {country: 'nl'}
}
p.init();

  $('.js-destroy-btn').on('click', onSubmit);

  function onSubmit(e) {
    e.preventDefault();
    var $destroyForm = $(e.target).closest('.js-destroy-form');
    var url = $destroyForm.attr("action");
    var formData = {};
    var formData = utils.gatherFormData($destroyForm);

    $.ajax({
      url: url,
      method: 'POST',
      data: formData
    }).done(function (resp) {
      $(e.target).closest('.item').remove();
    }).fail(function (jqXHR, textStatus) {
      console.log(jqXHR, textStatus);
      return false;
    });
  }