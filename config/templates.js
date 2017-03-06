var exphbs = require('express-handlebars');
var Handlebars = require('handlebars');

module.exports = exphbs.create({
  layoutsDir: 'app/templatesCommon/layouts/',
  partialsDir: 'app/templatesCommon/partials/',
  defaultLayout: 'main',
  extname: '.hbs',
  helpers: {
    section: function(name, options){
        if(!this._sections) this._sections = {};
        this._sections[name] = options.fn(this);
        return null;
    },
    if_eq: function(a, b, options) {
      if(a == b) {
        return options.fn(this);
      } else {
        return options.inverse(this);
      }
    },
    subtract: function(a, b) {
      return a - b;
    },
    sum: function(a, b) {
      return parseFloat(a) + parseFloat(b);
    },
    tagUrl: function(urlObject) {
      var tagUrl = urlObject.original.replace(/[?,&](page=|tag=)\d*\w*/gim, '');
      var queryExists= /\?/gim.test(tagUrl);
      if(queryExists) {
        return tagUrl + '&';
      }
      return tagUrl + '?';
    },
    pageUrl: function() {
      var pageUrl = this.url.original.replace(/[?,&]page=\d*/gim, '');
      var queryExists= /\?/gim.test(pageUrl);
      if(queryExists) {
        return pageUrl + '&';
      }
      return pageUrl + '?';
    },
    nextPageUrl: function() {
      var pageUrl = this.url.original.replace(/[?,&]page=\d*/gim, '');
      var queryExists = /\?/gim.test(pageUrl);
      var next = parseFloat(this.url.query.page) + 1 || 2;
      var nextPage = next <= this.pageCount ? next : this.url.query.page;
      if(queryExists) {
        return pageUrl + '&page=' + nextPage;
      }
      return pageUrl + '?page=' + nextPage;
    },
    prevPageUrl: function() {
      var pageUrl = this.url.original.replace(/[?,&]page=\d*/gim, '');
      var queryExists = /\?/gim.test(pageUrl);
      var prevPage = parseFloat(this.url.query.page) > 2 ? parseFloat(this.url.query.page) - 1 : false;
      if(!prevPage) {
        return pageUrl;
      } else if(queryExists) {
        return pageUrl + '&page=' + prevPage;
      }
      return pageUrl + '?page=' + prevPage;
    },
    pagination: function() {
      var pagination ='';
      var pageUrl = this.url.original.replace(/[?,&]page=\d*/gim, '');
      var queryExists= /\?/gim.test(pageUrl);
      if(queryExists) {
        pageUrl = pageUrl + '&';
      } else {
        pageUrl = pageUrl + '?';
      }
      for(var i = 1; i <= this.pageCount; i++) {
        if(parseFloat(this.page) === i) {
          pagination += '<a href="' + pageUrl + 'page=' + i + '" class="pagination-currentPage">' + i + '</a>';
        } else {
          pagination += '<a href="' + pageUrl + 'page=' + i + '">' + i + '</a>';
        }
      }
      return new Handlebars.SafeString(pagination);
    },
    setCount: function() {
      if(this.count && this.count > 10) {
        return '9+'
      }
      return this.count;
    }
  }
});