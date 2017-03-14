var utils = require('./utils/utils');
var Handlebars = require('handlebars');
var helpers = require('./utils/template-helpers');
var paginationTemplate = require('./templates/pagination.hbs');

function Pagination(options) {
  this.options = options;
  this.pagination = document.getElementById(this.options.id);
  this.paginatedContentArea = this.options.paginatedContentElement;
  this.template = this.options.template;
  this.renderArea = null;
}

Pagination.prototype.init = function () {
  if(this.pagination) {
    this.next = this.pagination.querySelector('.js-pagination-next');
    this.prev = this.pagination.querySelector('.js-pagination-prev');
    this.bindEvents();
  }
}

Pagination.prototype.bindEvents = function () {
  this.pagination.addEventListener('click', this.onClickHandler.bind(this));
}

Pagination.prototype.create = function() {
  this.createItemList();
  var pagination = document.createElement('div');
  var template = Handlebars.compile(paginationTemplate);
  var html = template(this.paginationData, helpers);

  pagination.innerHTML = html;
  utils.insertAfter(pagination, this.paginatedContentArea);
  this.pagination = document.getElementById(this.options.id);
  this.init();
}

Pagination.prototype.createItemList = function() {
  this.paginatedContentArea = document.createElement('div');
  utils.addClass(this.paginatedContentArea, 'js-itemList');
  var itemListTemplate = Handlebars.compile(this.template);
  var itemListHtml = itemListTemplate(this.paginationData, helpers);
  this.paginatedContentArea.innerHTML = itemListHtml;
  this.renderArea.appendChild(this.paginatedContentArea);
}

Pagination.prototype.onClickHandler = function (e) {
  e.preventDefault();
  this.target = e.target;
  this.url = this.target.getAttribute('href');
  if(!this.url) return;
  this.requestDataFromServer();
}

Pagination.prototype.requestDataFromServer = function () {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', this.url);
  xhr.onload = this.onDataFromServerLoad.bind(this, xhr);
  xhr.send();
}

Pagination.prototype.onDataFromServerLoad = function(xhr) {
  this.clearPaginatedContentArea();
  if (xhr.status === 200) {
    this.serverResponse = JSON.parse(xhr.response);
    this.currentPage = parseFloat(this.serverResponse.page);
    this.updateNextUrl();
    this.updatePrevUrl();
    this.highlightActivePageNumber();
    this.renderNewPage(xhr.response);
  }
  else {
    console.log('Request failed.  Returned status of ' + xhr.status);
  }
}

Pagination.prototype.clearPaginatedContentArea = function() {
  if(this.paginatedContentArea.children.length > 0) {
    while (this.paginatedContentArea.firstChild) {
      this.paginatedContentArea.removeChild(this.paginatedContentArea.firstChild);
    }
  }
}

Pagination.prototype.updateNextUrl = function() {
  var url = this.next.getAttribute('href');
  var nextPage = this.currentPage < this.serverResponse.pageCount ? this.currentPage + 1 : this.currentPage;
  var updatedUrl = url.replace(/\d+$/gim, nextPage)
  this.next.setAttribute('href', updatedUrl);
}

Pagination.prototype.updatePrevUrl = function() {
  var url = this.prev.getAttribute('href');
  var prevPage = this.currentPage > 2 ? this.currentPage - 1 : 1;
  var updatedUrl = url.replace(/\d+$/gim, prevPage);
  this.prev.setAttribute('href', updatedUrl);
}

Pagination.prototype.highlightActivePageNumber = function() {
  var siblings = this.pagination.children;
  for (var i = 0; i < siblings.length; i++) {
    var page = parseFloat(siblings[i].getAttribute('data-page'));
    if(page === this.currentPage) {
      utils.addClass(siblings[i], 'is-active');
    } else {
      utils.removeClass(siblings[i], 'is-active');
    }
  }
}

Pagination.prototype.renderNewPage = function() {
  var div = document.createElement('div');
  var template = Handlebars.compile(this.template);
  var html = template(this.serverResponse, helpers);
  div.innerHTML = html;
  this.paginatedContentArea.appendChild(div);
}

module.exports = Pagination;