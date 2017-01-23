define([
  'components/utils/utils'
], function (
  utils
) {
  function Form(className) {
    this.forms = document.getElementsByClassName(className);
    this.currentForm = null;
  }

  Form.prototype.init = function () {
    if(this.forms.length > 0) {
      this.bindEvents();
    }
  };

  Form.prototype.bindEvents = function () {
  };

  Form.prototype.onKeyUp = function (e) {
    var target = e.target;

    while(target != document) {
      if (target && utils.selectorMatches(target, '.js-form')) {
        this.currentForm = target;
      }
      target = target.parentNode;
    }
  };

  return Form;
});
