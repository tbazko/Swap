var PlacesAutoComplete = require('../components/PlacesAutoComplete');

var p = new PlacesAutoComplete('autocomplete');
p.options = {
  types: ['geocode'],
  componentRestrictions: {country: 'nl'}
}
p.init();  
