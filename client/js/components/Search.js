var $ = require('jquery');
var utils = require('./utils/utils');
var Mustache = require('mustache');
var suggestionsTemplate = '{{#suggestions}}' +
  '<div>' +
  '{{^tag}}' +
  '{{#category}}' +
  '<a href="/category/{{name}}?cid={{id}}&search={{name}}">' +
  '<p>{{name}} in <span class="highlight">{{category}}</span></p>' +
  '</a>' +
  '{{/category}}' +
  '{{^category}}' +
  '<a href="/search?search={{name}}">' +
  '<p>{{name}} in <span class="highlight">All categories</span></p>' +
  '</a>' +
  '{{/category}}' +
  '{{/tag}}' +
  '{{#tag}}' +
  '<a href="/?tag={{name}}">' +
  '<p>#{{name}}</p>' +
  '</a>' +
  '{{/tag}}' +
  '</div>' +
  '{{/suggestions}}';

var typeahead = require('typeahead');
var Bloodhound = require('bloodhound');

function Search() {
  this.search = document.getElementById('itemSearch');
  this.searchResults = document.getElementById('itemSearchResults');
  this.suggestions = [];
}

Search.prototype.init = function () {
  if (this.search) {
    var items = new Bloodhound({
      datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      identify: function (obj) {
        return obj.category;
      },
      remote: {
        url: '/suggest?search=%QUERY',
        wildcard: '%QUERY',
        transform: (response) => {
          this.fullResponse = response;
          this.modifiedResponse = [];
          var query = $('input#itemSearch').typeahead('val');
          var pattern = new RegExp('\\b\\w*' + query + '\\w*\\b', 'gmi');
          this.fullResponse.categories.forEach((category, index) => {
            var item = category.item;
            var match = item.name.match(pattern) || item.description.match(pattern);
            if (index === 0) {
              this.modifiedResponse.push({ id: null, category: null, name: match.length > 0 ? match[0] : false });
            }
            this.modifiedResponse.push({ id: category.id, category: category.name, name: match[0] });
          });

          this.fullResponse.tags.forEach((tag) => {
            this.modifiedResponse.push({ tag: tag.name, name: tag.name });
          });
          return this.modifiedResponse;
        }
      }
    });

    function uniqueArray(arrArg) {
      return arrArg.filter((elem, pos, arr) => {
        return arr.indexOf(elem) == pos;
      });
    }

    $('input#itemSearch').typeahead({
      highlight: true,
      hint: true,
      minLength: 3
    }, {
        name: 'results',
        source: items,
        hint: true,
        limit: 15,
        display: function (obj) {
          if (obj.category) {
            return obj.name + ' in ' + obj.category;
          } else {
            return obj.name;
          }
        },
        templates: {
          empty: [
            '<div class="empty-message">',
            'unable to find any items',
            '</div>'
          ].join('\n'),
          suggestion: function (suggestions) {
            var div = document.createElement('div');
            var html = Mustache.render(suggestionsTemplate, { suggestions: suggestions, searchTerm: $('input#itemSearch').val() });
            div.innerHTML = html;

            return div.firstChild || div;
          }
        }
      });
  }
}

Search.prototype.bindEvents = function () {
  this.search.addEventListener('keydown', this.onKeydown.bind(this));
  window.socket.on('results', this.renderSuggestions.bind(this));
};

Search.prototype.onKeydown = function (e) {
  var text = this.search.value;
  if (text !== '') {
    window.socket.emit('search', text);
  }
}

module.exports = Search;