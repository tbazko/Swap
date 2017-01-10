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
    }
  }

});
