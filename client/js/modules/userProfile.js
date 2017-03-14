var utils = require('../components/utils/utils');
var TabPane = require('../components/TabPane');
var itemListTemplate = require('../components/templates/itemListTemplate.hbs');
var Pagination = require('../components/Pagination');

document.addEventListener('click', onSubmit.bind(this), true);
document.addEventListener('switchedTab', createPagination, true);

var tabPane = new TabPane('userProfileItemsTab', {
  ajax: true,
  template: itemListTemplate,
  dataForTemplate: {addPagination: true}
});
var pagination = new Pagination({
  paginatedContentElement: document.querySelector('.js-pane.is-active .js-itemList') ||
                           document.querySelector('.js-itemList'),
  template: itemListTemplate,
  id: 'pagination'
});

tabPane.init();
pagination.init();

function createPagination(e) {
  var pagination = new Pagination({
    paginatedContentElement: document.querySelector('.js-pane.is-active .js-itemList'),
    template: itemListTemplate,
    id: 'pagination-second'
  });
  pagination.paginationData = e.detail;
  pagination.renderArea = e.detail.currentPane;
  pagination.create();
}

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