define([
  'jquery',
  'components/utils/utils',
  'text!components/templates/suggestions.html',
  'mustache',
  'typeahead',
  'bloodhound'
], function (
  $,
  utils,
  suggestionsTemplate,
  Mustache,
  typeahead,
  Bloodhound
) {
  function Search() {
    this.search = document.getElementById('itemSearch');
    this.searchResults = document.getElementById('itemSearchResults');
    this.suggestions = [];
  }

  Search.prototype.init = function () {
    if(this.search) {

      // function customTokenizer(datum) {
      //   var nameTokens = Bloodhound.tokenizers.whitespace(datum.name);
      //   var descriptionTokens = Bloodhound.tokenizers.whitespace(datum.description);
      //   var statusTokens = Bloodhound.tokenizers.whitespace(datum.status);
      //
      //   return nameTokens.concat(descriptionTokens).concat(statusTokens);
      // }
      var items = new Bloodhound({
        datumTokenizer: function(datum) {
          var nameTokens = Bloodhound.tokenizers.whitespace(datum.name);
          var descriptionTokens = Bloodhound.tokenizers.whitespace(datum.description);
          var statusTokens = Bloodhound.tokenizers.whitespace(datum.status);
          var custom = nameTokens.concat(descriptionTokens).concat(statusTokens);
          console.log(custom);
          return custom;
        },
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        // prefetch: '/search/category || tag || location',
        remote: {
          url: '/search?key=%QUERY',
          wildcard: '%QUERY'
        }
      });

      $('input#itemSearch').typeahead({
        highlight: true,
        hint: true,
        minlength: 3
      }, {
        name: 'best-pictures',
        // display: function(item) {
        //   return 'Name: ' + item.name + '<p>Description: ' + item.description;
        // },
        source: items,
        limit: 10,
        templates: {
        empty: [
          '<div class="empty-message">',
            'unable to find any items',
          '</div>'
        ].join('\n'),
        suggestion: function(item) {
          var div = document.createElement('div');
          var html = Mustache.render(suggestionsTemplate, {suggestions: item});
          div.innerHTML = html;
          return div.firstChild;
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
    if(text !== '') {
      window.socket.emit('search', text);
    }
  }

  Search.prototype.renderSuggestions = function (suggestions) {
    this.suggestions = suggestions;
    // if(suggestions.length) {
    //   this.searchResults.innerHTML = '';
    //   var html = Mustache.render(suggestionsTemplate, {suggestions: suggestions});
    //   this.searchResults.innerHTML = html;
    // } else {
    //   this.searchResults.innerHTML = '';
    // }
  };

  return Search;
});
