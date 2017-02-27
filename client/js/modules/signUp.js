var FormValidator = require('../components/FormValidator');
var PlacesAutoComplete = require('../components/PlacesAutoComplete');

var p = new PlacesAutoComplete('autocomplete');
p.options = {
  types: ['(cities)'],
  componentRestrictions: {country: 'nl'}
}
p.init();
var form = new FormValidator('js-form');
form.init();