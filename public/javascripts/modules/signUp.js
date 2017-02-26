var PlacesAutoComplete = require('components/PlacesAutoComplete');

var p = new PlacesAutoComplete('autocomplete');
p.options = {
  types: ['(cities)'],
  componentRestrictions: {country: 'nl'}
}
p.init();
