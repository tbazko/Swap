'use strict';

class StringEditor {
  static escape(str) {
    if(!str) return str;
    return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\//g, '&#x2F;').replace(/\\/g, '&#x5C;').replace(/`/g, '&#96;');
  }

  static unescape(str) {
    if(!str) return str;
    return str.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#x2F;/g, '/').replace(/&#96;/g, '`');
  }

  static trim(str, chars) {
    if(!str) return str;
    return this.rtrim(this.ltrim(str, chars), chars);
  }

  static ltrim(str, chars) {
    if(!str) return str;
    var pattern = chars ? new RegExp('^[' + chars + ']+', 'g') : /^\s+/g;
    return str.replace(pattern, '');
  }

  static rtrim(str, chars) {
    if(!str) return str;
    var pattern = chars ? new RegExp('[' + chars + ']') : /\s/;

    var idx = str.length - 1;
    while (idx >= 0 && pattern.test(str[idx])) {
      idx--;
    }

    return idx < str.length ? str.substr(0, idx + 1) : str;
  }
}

module.exports = StringEditor;
