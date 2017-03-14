var utils = require('./utils/utils');
var tagTemplate = require('./templates/tag.html');
var Mustache = require('mustache');

function TagTransformer(id) {
  this.tagsContainerSelector = id;
  this.realTagsInputId = 'real' + '-' + id;
  this.fakeTagInputSelector = 'js-addTag';
  this.removeTagSelector = 'js-removeTag';
  this.tagsContainer = document.getElementById(id);
  this.realInput = document.getElementById(this.realTagsInputId);

  this.forbiddenSymbols = /[^а-яА-ЯЁёІіЇїҐґЄєЩщa-zA-Z0-9_\-]+/gi;
  this.currentInput = null;
}

TagTransformer.prototype.init = function () {
  this.bindEvents();
};

TagTransformer.prototype.bindEvents = function () {
  this.tagsContainer.addEventListener('keydown', this.onKeyUp.bind(this), true);
  this.tagsContainer.addEventListener('click', this.onClick.bind(this));
  this.tagsContainer.addEventListener('blur', this.onBlur.bind(this), true);
};

TagTransformer.prototype.onKeyUp = function (e) {
  this.setCurrentInput(e.target);
  if(this.currentInput) {
    this.removeForbiddenCharacters();
    this.transformToTag(e);
  }
}

TagTransformer.prototype.onClick = function (e) {
  if(utils.selectorMatches(e.target, '.' + this.removeTagSelector)) {
    this.tagToRemove = e.target.parentNode;
    this.removeTag();
  }
};

TagTransformer.prototype.onBlur = function (e) {
  e.keyCode = 9;
  this.onKeyUp(e);
  this.currentInput.blur();
}

TagTransformer.prototype.setCurrentInput = function (target) {
  if (target && utils.selectorMatches(target, '.' + this.fakeTagInputSelector)) {
    this.currentInput = target;
  }
};

TagTransformer.prototype.removeForbiddenCharacters = function() {
  if(this.forbiddenSymbols.test(this.currentInput.value)) {
    this.currentInput.value = this.currentInput.value.replace(this.forbiddenSymbols, '');
  }
}

TagTransformer.prototype.transformToTag = function(e) {
  // comma - 188, 32 - space, 13 - return, tab - 9
  var keyCode = e.keyCode;
  if(keyCode === 9 && this.currentInput.value === '') return;
  if(keyCode === 188 || keyCode === 32 || keyCode === 13 || keyCode === 9) {
    e.preventDefault();
    if(this.currentInput.value && this.currentInput.value != '') {
      this.updateRealInputValue();
      this.renderTag();
      this.currentInput.value = '';
      this.currentInput.focus();
    }
  }
  // backspace - 8
  if(keyCode === 8 && this.currentInput.value === '') {
    this.tagToRemove = this.getLastTag();
    this.removeTag();
  }
};

TagTransformer.prototype.getLastTag = function () {
  var tags = this.currentInput.parentNode.querySelectorAll('.js-tag');
  return tags[tags.length - 1];
};

TagTransformer.prototype.removeTag = function () {
  if(!this.tagToRemove) return;
  var replace = utils.trim(this.tagToRemove.innerText) + ',';
  var re = new RegExp(replace, "g");
  this.tagToRemove.remove();
  this.realInput.value = this.realInput.value.replace(re, '');
};

TagTransformer.prototype.updateRealInputValue = function () {
  this.realInput.value = this.realInput.value + this.currentInput.value + ',';
};

TagTransformer.prototype.renderTag = function (data) {
  var html = Mustache.render(tagTemplate, {tag: this.currentInput.value});
  var div = document.createElement('div');
  var parent = this.currentInput.parentNode;
  div.innerHTML = html;
  parent.insertBefore(div.firstChild, this.currentInput);
};

module.exports = TagTransformer;