var $ = require('jquery');
var utils = require('./utils/utils');
// var suggestionsTemplate = require('text!components/templates/suggestions.html');
// var mustache = require('mustache');
var typeahead = require('typeahead.js');
var Bloodhound = require('bloodhound-js');

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
    // datumTokenizer: function(datum) {
    //   var nameTokens = Bloodhound.tokenizers.whitespace(datum.name);
    //   var descriptionTokens = Bloodhound.tokenizers.whitespace(datum.description);
    //   var statusTokens = Bloodhound.tokenizers.whitespace(datum.status);
    //   var custom = nameTokens.concat(descriptionTokens).concat(statusTokens);
    //   return custom;
    // },
    datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    identify: function(obj) {
        return obj.category;
    },
    remote: {
        url: '/suggest?search=%QUERY',
        wildcard: '%QUERY',
        transform: (response) => {
        console.log(response);
        this.fullResponse = response;
        // console.log(response);
        this.modifiedResponse = [];
        var query = $('input#itemSearch').typeahead('val');
        var pattern = new RegExp('\\b\\w*' + query + '\\w*\\b', 'gmi');
        this.fullResponse.categories.forEach((category, index) => {
            var item = category.item;
            var match = item.name.match(pattern) || item.description.match(pattern);
            if(index === 0) {
            this.modifiedResponse.push({id: null , category: null, name: match[0]});
            }
            this.modifiedResponse.push({id: category.id , category: category.name, name: match[0]});
        });

        this.fullResponse.tags.forEach((tag) => {
            this.modifiedResponse.push({tag: tag.name, name: tag.name});
        });
        return this.modifiedResponse;
        }
    }
    });

    function uniqueArray(arrArg) {
    return arrArg.filter((elem, pos, arr) => {
        // console.log(arr.indexOf(elem.category));
        return arr.indexOf(elem) == pos;
    });
    }
    $(document)
    .on('typeahead:render', onRender)
    .on('typeahead:select', onSelect)
    .on('typeahead:autocomplete', onAutocomplete);

    function onRender(event, suggestions, a, b) {
    // console.log(event);
    // console.log(suggestions);
    // console.log(isAsync);
    // console.log(arguments);
    }

    function onSelect(event, suggestion) {

    }

    function onAutocomplete(event, suggestion) {
    // console.log(event);
    // console.log(suggestion);
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
    display: function(obj) {
        if(obj.category) {
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
        suggestion: function(suggestions) {
        var div = document.createElement('div');
        var html = Mustache.render(suggestionsTemplate, {suggestions: suggestions, searchTerm: $('input#itemSearch').val()});
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

module.exports = Search;