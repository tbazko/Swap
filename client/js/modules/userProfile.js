var $ = require('jquery');

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