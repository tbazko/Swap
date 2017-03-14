var Search = require('../components/Search');
var Pagination = require('../components/Pagination');
var itemListTemplate = require('../components/templates/itemListTemplate.hbs');

var search = new Search();
search.init();
var pagination = new Pagination({
  paginatedContentElement: document.querySelector('.js-itemList'),
  template: itemListTemplate,
  id: 'pagination'
});

pagination.init();