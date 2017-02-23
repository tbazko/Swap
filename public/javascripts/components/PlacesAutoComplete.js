define(['async!https://maps.googleapis.com/maps/api/js?key=AIzaSyCvLphh5RdATb2mbpFCZ0k02_ZqFQZjukk&libraries=places&language=en'], function () {
  function PlacesAutoComplete(inputId) {
    this.input = document.getElementById(inputId);
    this.options = {};
    this.addressForm = {
      street_number: 'short_name',
      route: 'long_name',
      locality: 'long_name',
      administrative_area_level_1: 'short_name',
      country: 'long_name',
      postal_code: 'short_name'
    };
  }

  PlacesAutoComplete.prototype.init = function () {
    this.autocomplete = new google.maps.places.Autocomplete(this.input, this.options);
    this.bindEvents();
  };

  PlacesAutoComplete.prototype.bindEvents = function () {
    this.autocomplete.addListener('place_changed', this.onPlaceChanged.bind(this));
  };

  PlacesAutoComplete.prototype.onPlaceChanged = function () {
    this.fillInAddress();
  };

  PlacesAutoComplete.prototype.fillInAddress = function () {
    var place = this.autocomplete.getPlace();

    for (var component in this.addressForm) {
      if(document.getElementById(component)) {
        document.getElementById(component).value = '';
        document.getElementById(component).disabled = false;
      }
    }

    var addressComponents = place.address_components;
    var components = {};
    for (var i = 0, l = addressComponents.length; i < l; i++) {
      var addressType = addressComponents[i].types[0];
      if (this.addressForm[addressType]) {
        var val = addressComponents[i][this.addressForm[addressType]];
        if(document.getElementById(addressType)) {
          document.getElementById(addressType).value = val;
          components[addressType] = val;
        }
      }

    }
  };

  return PlacesAutoComplete;
});
