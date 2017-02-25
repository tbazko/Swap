define([
  'components/PlacesAutoComplete'
], function (
  PlacesAutoComplete
) {
  var p = new PlacesAutoComplete('autocomplete');
  p.options = {
    types: ['geocode'],
    componentRestrictions: {country: 'nl'}
  }
  p.init();  
});
