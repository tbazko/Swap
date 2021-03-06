var cookies;

module.exports = {
  closest: function (el, selector) {
    var closest;
    while (el) {
      closest = el;
      if (closest && this.selectorMatches(closest, selector)) {
        return closest;
      }
      el = closest.parentElement;
    }

    return null;
  },

  readCookie: function (name) {
    if (cookies) { return cookies[name]; }

    var c = document.cookie.split('; ');
    cookies = {};

    for (var i = c.length - 1; i >= 0; i--) {
      var C = c[i].split('=');
      cookies[C[0]] = C[1];
    }

    return cookies[name];
  },

  selectorMatches: function (el, selector) {
    var p = Element.prototype;
    var f = p.matches || p.webkitMatchesSelector || p.mozMatchesSelector || p.msMatchesSelector || function (s) {
      return [].indexOf.call(document.querySelectorAll(s), this) !== -1;
    };
    return f.call(el, selector);
  },

  addClass: function (element, className) {
    if (this.selectorMatches(element, '.' + className)) return;

    if (element.className != '') {
      element.className += ' ' + className;
    } else {
      element.className = className;
    }
  },

  removeClass: function (element, className) {
    var regex = new RegExp('(?:^|\\s)' + className + '(?!\\S)', 'gi');
    element.className = element.className.replace(regex, '');
  },

  insertAfter: function (newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
  },

  trim: function (str, chars) {
    if (!str) return str;
    return this.rtrim(this.ltrim(str, chars), chars);
  },

  ltrim: function (str, chars) {
    if (!str) return str;
    var pattern = chars ? new RegExp('^[' + chars + ']+', 'g') : /^\s+/g;
    return str.replace(pattern, '');
  },

  rtrim: function (str, chars) {
    if (!str) return str;
    var pattern = chars ? new RegExp('[' + chars + ']') : /\s/;

    var idx = str.length - 1;
    while (idx >= 0 && pattern.test(str[idx])) {
      idx--;
    }

    return idx < str.length ? str.substr(0, idx + 1) : str;
  }
}