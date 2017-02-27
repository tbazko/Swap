var FormValidator = require('../components/FormValidator');
var Search = require('../components/Search');

var form = new FormValidator('js-form');
var search = new Search();
form.init();
search.init();