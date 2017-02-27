var FormValidator = require('../components/FormValidator');
var PlacesAutoComplete = require('../components/PlacesAutoComplete');

var p = new PlacesAutoComplete('autocomplete');
var form = new FormValidator();
form.init();
p.options = {
  types: ['geocode'],
  componentRestrictions: {country: 'nl'}
}
p.init();