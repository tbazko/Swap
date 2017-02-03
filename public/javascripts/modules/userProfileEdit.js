define([
  'components/PlacesAutoComplete'
], function (
  PlacesAutoComplete
) {
  var p = new PlacesAutoComplete('autocomplete');
  p.options = {
    types: ['geocode'],
    componentRestrictions: {country: 'ua'}
  }  
  p.init();
});
