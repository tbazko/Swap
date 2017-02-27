var utils = require('../components/utils/utils');

document.addEventListener('click', onSubmit.bind(this), true);

function submit(target) {
  var destroyForm = utils.closest(target, '.js-destroy-form');
  var url = destroyForm.getAttribute('action');
  var formData = new FormData(destroyForm);
  var xhr = new XMLHttpRequest();

  xhr.open('POST', url);
  xhr.onload = function () {
    if (xhr.status === 200) {
      var item = utils.closest(target, '.item');
      item.parentElement.removeChild(item);
    }
    else if (xhr.status !== 200) {
      console.log(xhr.status);
    }
  };
  xhr.send(formData);
}

function onSubmit(e) {
  if(utils.closest(e.target, '.js-destroy-btn')) {
    e.preventDefault();
    submit(e.target);
  }
}