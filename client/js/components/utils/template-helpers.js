var Handlebars = require('handlebars');

var register = function (Handlebars) {
  var helpers = {
    section: function (name, options) {
      if (!this._sections) this._sections = {};
      this._sections[name] = options.fn(this);
      return null;
    },
    if_eq: function (a, b, options) {
      if (a == b) {
        return options.fn(this);
      } else {
        return options.inverse(this);
      }
    },
    unless_eq: function (a, b, options) {
      if (a == b) {
        return options.inverse(this);
      } else {
        return options.fn(this);
      }
    },
    subtract: function (a, b) {
      return a - b;
    },
    sum: function (a, b) {
      return parseFloat(a) + parseFloat(b);
    },
    urlWithQuery: function () {
      var queryExists = /\?/gim.test(this.url.original);
      if (queryExists) {
        return this.url.original + '&';
      }
      return this.url.original + '?';
    },
    tagUrl: function (urlObject) {
      var url = urlObject.original;
      if(typeof window !== 'undefined') {
        url = window.location.href;
      }
      var tagUrl = url.replace(/[?,&](page=|tag=)\d*\w*/gim, '');
      var queryExists = /\?/gim.test(tagUrl);
      if (queryExists) {
        return tagUrl + '&';
      }
      return tagUrl + '?';
    },
    pageUrl: function () {
      var pageUrl = this.url.original.replace(/[?,&]page=\d*/gim, '');
      var queryExists = /\?/gim.test(pageUrl);
      if (queryExists) {
        return pageUrl + '&';
      }
      return pageUrl + '?';
    },
    nextPageUrl: function () {
      var prefix = getPaginationUrlPrefix(this);
      var pageUrl = this.url.original.replace(/[?,&]page=\d*/gim, '');
      var next = parseFloat(this.url.query.page) + 1 || 2;
      var nextPage = next <= this.pageCount ? next : this.url.query.page;
      return makePaginationUrl(prefix, pageUrl, nextPage);
    },
    prevPageUrl: function () {
      var prefix = getPaginationUrlPrefix(this);
      var pageUrl = this.url.original.replace(/[?,&]page=\d*/gim, '');
      var prevPage = parseFloat(this.url.query.page) > 2 ? parseFloat(this.url.query.page) - 1 : 1;
      return makePaginationUrl(prefix, pageUrl, prevPage);
    },
    pagination: function () {
      var prefix = getPaginationUrlPrefix(this);
      var pagination = '';
      var pageUrl = this.url.original.replace(/[?,&]page=\d*/gim, '');
      var queryExists = /\?/gim.test(pageUrl);
      if (queryExists) {
        var queryStr = pageUrl.replace(/.*\?/gim, '');
        pageUrl = prefix + '/items?' + queryStr + '&';
      } else {
        pageUrl = prefix + '/items?';
      }
      for (var i = 1; i <= this.pageCount; i++) {
        if (parseFloat(this.page) === i) {
          pagination += '<a href="' + pageUrl + 'page=' + i + '" class="is-active" data-page="' + i +'">' + i + '</a>';
        } else {
          pagination += '<a href="' + pageUrl + 'page=' + i + '" data-page="' + i + '">' + i + '</a>';
        }
      }

      return new Handlebars.SafeString(pagination);
    },
    setCount: function () {
      if (this.count && this.count > 10) {
        return '9+'
      }
      return this.count;
    }
  };

  if (Handlebars && typeof Handlebars.registerHelper === "function") {
    // register helpers
    for (var prop in helpers) {
      Handlebars.registerHelper(prop, helpers[prop]);
    }
  } else {
    // just return helpers object if we can't register helpers here
    return helpers;
  }

};

// client
if (typeof window !== "undefined") {
  register(Handlebars);
}
// server
else {
  module.exports.register = register;
  module.exports.helpers = register(Handlebars);
}

function getPaginationUrlPrefix(self) {
  if(self.url.params.userId) {
    return '/user/' + self.url.params.userId;
  } else if(self.isCurrentUserProfile) {
    return '/user';
  }
  return '';
}

function makePaginationUrl(prefix, pageUrl, pageNumber) {
  var queryExists = /\?/gim.test(pageUrl);
  if (queryExists) {
    var queryStr = pageUrl.replace(/.*\?/gim, '');
    return prefix + '/items?' + queryStr + '&page=' + pageNumber;
  }
  return prefix + '/items?page=' + pageNumber;
}