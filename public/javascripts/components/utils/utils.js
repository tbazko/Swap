define([
  'jquery'
], function (
  $
) {
  var cookies;

  return {
    activate: function($element) {
      $element.toggleClass('is-active', !$element.hasClass('is-active'));
    },

    deactivate: function($element) {
      $element.removeClass('is-active');
    },

    gatherFormData: function($form) {
      var formData = {};
      $form.find('input[name]:not([type="checkbox"], [type="radio"]), textarea').each(function (index, node) {
        formData[node.name] = node.value;
      });
      $form.find(':checked, :selected').each(function(index, node) {
        var name = node.name;
        if(!formData[name]) {
          formData[name] = [];
        }
        formData[name].push(node.value);
      });

      return formData;
    },

    readCookie: function(name){
        if(cookies){ return cookies[name]; }

        var c = document.cookie.split('; ');
        cookies = {};

        for(var i=c.length-1; i>=0; i--){
           var C = c[i].split('=');
           cookies[C[0]] = C[1];
        }

        return cookies[name];
    },

    selectorMatches: function(el, selector) {
    	var p = Element.prototype;
    	var f = p.matches || p.webkitMatchesSelector || p.mozMatchesSelector || p.msMatchesSelector || function(s) {
    		return [].indexOf.call(document.querySelectorAll(s), this) !== -1;
    	};
    	return f.call(el, selector);
    },

    addClass: function(element, className) {
      if(this.selectorMatches(element, '.' + className)) return;

      if (element.className != '') {
  			element.className += ' ' + className;
  		} else {
  			element.className = className;
  		}
    },

    removeClass: function(element, className) {
      var regex = new RegExp('(?:^|\\s)' + className + '(?!\\S)', 'gi');
			element.className = element.className.replace(regex, '');
    }
  }

});
