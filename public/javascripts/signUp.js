!function a(b,c,d){function e(g,h){if(!c[g]){if(!b[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);var j=new Error("Cannot find module '"+g+"'");throw j.code="MODULE_NOT_FOUND",j}var k=c[g]={exports:{}};b[g][0].call(k.exports,function(a){var c=b[g][1][a];return e(c?c:a)},k,k.exports,a,b,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(a,b,c){"use strict";function d(){this.id="requestCounter",this.count=0}d.prototype.update=function(){var a=document.getElementById(this.id);a.innerHTML=++this.count},b.exports=d},{}],2:[function(a,b,c){"use strict";function d(a){this.forms=document.getElementsByClassName(a),this.currentForm=null,this.minPasswordLength=6,this.errorMessages={invalidEmail:"Invalid email format",invalidCharacters:"Contains forbidden symbols",minPasswordLength:"Password should contain at least 6 symbols"},this.errors={},this.emailRegex=/(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/i,this.urlRegex=/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)/}var e=a("./utils/utils");d.prototype.init=function(){this.forms.length>0&&this.bindEvents()},d.prototype.bindEvents=function(){document.addEventListener("blur",this.onBlur.bind(this),!0),document.addEventListener("keyup",this.onKeyUp.bind(this),!0),document.addEventListener("submit",this.onSubmit.bind(this),!0)},d.prototype.onBlur=function(a){var b=a.target;this.setCurrentForm(b),this.validateInput(b)},d.prototype.onKeyUp=function(a){var b=a.target;(b.hasAttribute("type")&&"text"===b.getAttribute("type")||e.selectorMatches(b,"textarea"))&&(this.setCurrentForm(b),this.validateInput(b))},d.prototype.onSubmit=function(a){a.preventDefault();var b=a.target;this.setCurrentForm(b),this.isValidForm()&&this.submitForm()},d.prototype.setCurrentForm=function(a){for(;a!=document;)a&&e.selectorMatches(a,".js-form")&&(this.currentForm=a),a=a.parentNode},d.prototype.validateInput=function(a){if(""!==a.value){var b=a.hasAttribute("type")&&"email"===a.getAttribute("type"),c=a.hasAttribute("type")&&"text"===a.getAttribute("type")||e.selectorMatches(a,"textarea"),d=a.hasAttribute("type")&&"password"===a.getAttribute("type")&&"true"===a.getAttribute("data-validate");b?this.validateEmail(a):c?(this.validateForRestrictedCharacters(a),this.removeEmails(a),this.removeUrls(a)):d&&this.validatePassword(a)}},d.prototype.validateEmail=function(a){this.isEmail(a.value)?(e.addClass(a,"is-valid"),e.removeClass(a,"is-invalid"),this.hideInputError(a)):(e.removeClass(a,"is-valid"),e.addClass(a,"is-invalid"),this.showInputError(a,this.errorMessages.invalidEmail))},d.prototype.validateForRestrictedCharacters=function(a){a.getAttribute("data-custom-validation")||(this.isValidString(a.value)?(e.addClass(a,"is-valid"),e.removeClass(a,"is-invalid"),this.hideInputError(a)):(e.removeClass(a,"is-valid"),e.addClass(a,"is-invalid"),this.showInputError(a,this.errorMessages.invalidCharacters)))},d.prototype.isValidForm=function(){var a=this.currentForm.querySelector(".is-invalid");return!a},d.prototype.submitForm=function(){this.currentForm.getAttribute("data-ajax-submit")||this.currentForm.submit()},d.prototype.removeEmails=function(a){this.emailRegex.test(a.value)&&(a.value=a.value.replace(this.emailRegex,"((Forbidden))"))},d.prototype.removeUrls=function(a){this.urlRegex.test(a.value)&&(a.value=a.value.replace(this.urlRegex,"((Forbidden))"))},d.prototype.validatePassword=function(a){a.value.length<6?(e.removeClass(a,"is-valid"),e.addClass(a,"is-invalid"),this.showInputError(a,this.errorMessages.minPasswordLength)):(e.addClass(a,"is-valid"),e.removeClass(a,"is-invalid"),this.hideInputError(a))},d.prototype.isValidString=function(a){var b=/^[а-яА-ЯЁёІіЇїҐґЄєЩщa-zA-Z0-9.,!"'_\-()@?#:$;\s\u00A0\u000D\u000A\000C]+$/gm;return b.test(a)},d.prototype.showInputError=function(a,b){if(a.nextElementSibling){var c=a.nextElementSibling;if(e.selectorMatches(c,".inputError"))return}var d=document.createElement("div");d.innerText=b,e.addClass(d,"inputError"),e.insertAfter(d,a)},d.prototype.hideInputError=function(a){var b,c;a.nextElementSibling&&(b=a.nextElementSibling,c=b.parentNode,e.selectorMatches(b,".inputError")&&c.removeChild(b))},d.prototype.isEmail=function(a){var b=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;return b.test(a)},b.exports=d},{"./utils/utils":5}],3:[function(a,b,c){"use strict";function d(a,b,c){this.menu=document.getElementsByClassName(a)[0],this.trigger=document.getElementsByClassName(b)[0],this.container=document.getElementById("main"),this.navigation=document.getElementById("navigation"),this.navigationHeight=this.navigation.offsetHeight,this.lastKnownScrollPosition=0,this.ticking=!1}d.prototype.init=function(){this.bindEvents()},d.prototype.bindEvents=function(){this.trigger.addEventListener("click",this.toggleMenu.bind(this),!1),window.addEventListener("scroll",this.onScrollThrottle.bind(this),!1),window.addEventListener("optimizedResize",this.setNavigationHeight.bind(this),!1)},d.prototype.onScrollThrottle=function(){this.lastKnownScrollPosition=window.scrollY,this.ticking||window.requestAnimationFrame(function(){this.getSticky(this.lastKnownScrollPosition),this.ticking=!1}.bind(this)),this.ticking=!0},d.prototype.setNavigationHeight=function(){this.navigation.style.height="",this.navigationHeight=this.navigation.offsetHeight,this.lastKnownScrollPosition&&this.getSticky(this.lastKnownScrollPosition)},d.prototype.toggleMenu=function(){this.menu.classList.toggle("is-active"),this.trigger.classList.toggle("is-active"),this.container.classList.toggle("is-active-menu")},d.prototype.getSticky=function(){var a=40,b=this.lastKnownScrollPosition<this.navigationHeight-a?this.navigationHeight-this.lastKnownScrollPosition:a;this.navigation.style.height=b+"px",this.lastKnownScrollPosition>(this.navigationHeight-a)/2?this.navigation.classList.add("is-sticky"):this.navigation.classList.remove("is-sticky")},b.exports=d},{}],4:[function(a,b,c){"use strict";function d(a){this.input=document.getElementById(a),this.options={},this.addressForm={street_number:"short_name",route:"long_name",locality:"long_name",administrative_area_level_1:"short_name",country:"long_name",postal_code:"short_name"}}d.prototype.init=function(){this.autocomplete=new google.maps.places.Autocomplete(this.input,this.options),this.bindEvents()},d.prototype.bindEvents=function(){this.autocomplete.addListener("place_changed",this.onPlaceChanged.bind(this))},d.prototype.onPlaceChanged=function(){this.fillInAddress()},d.prototype.fillInAddress=function(){var a=this.autocomplete.getPlace();for(var b in this.addressForm)document.getElementById(b)&&(document.getElementById(b).value="",document.getElementById(b).disabled=!1);for(var c=a.address_components,d={},e=0,f=c.length;e<f;e++){var g=c[e].types[0];if(this.addressForm[g]){var h=c[e][this.addressForm[g]];document.getElementById(g)&&(document.getElementById(g).value=h,d[g]=h)}}},b.exports=d},{}],5:[function(a,b,c){"use strict";var d;b.exports={closest:function a(b,c){for(var a;b;){if(a=b,a&&this.selectorMatches(a,c))return a;b=a.parentElement}return null},readCookie:function(a){if(d)return d[a];var b=document.cookie.split("; ");d={};for(var c=b.length-1;c>=0;c--){var e=b[c].split("=");d[e[0]]=e[1]}return d[a]},selectorMatches:function(a,b){var c=Element.prototype,d=c.matches||c.webkitMatchesSelector||c.mozMatchesSelector||c.msMatchesSelector||function(a){return[].indexOf.call(document.querySelectorAll(a),this)!==-1};return d.call(a,b)},addClass:function(a,b){this.selectorMatches(a,"."+b)||(""!=a.className?a.className+=" "+b:a.className=b)},removeClass:function(a,b){var c=new RegExp("(?:^|\\s)"+b+"(?!\\S)","gi");a.className=a.className.replace(c,"")},insertAfter:function(a,b){b.parentNode.insertBefore(a,b.nextSibling)},trim:function(a,b){return a?this.rtrim(this.ltrim(a,b),b):a},ltrim:function(a,b){if(!a)return a;var c=b?new RegExp("^["+b+"]+","g"):/^\s+/g;return a.replace(c,"")},rtrim:function(a,b){if(!a)return a;for(var c=b?new RegExp("["+b+"]"):/\s/,d=a.length-1;d>=0&&c.test(a[d]);)d--;return d<a.length?a.substr(0,d+1):a}}},{}],6:[function(a,b,c){"use strict";var d=a("../components/utils/utils").readCookie,e=a("../components/Menu"),f=a("../components/Counter"),g=a("../components/FormValidator");if(d("logged")){var h=d("logged");window.socket=io();var i,j=window.socket;j.on("newSwapRequest",function(a){i||(i=new f),i.update()}),j.emit("joinRoom",h)}var k=new g;k.init();var l=new e("js-menu-wrapper","js-menu-trigger");l.init()},{"../components/Counter":1,"../components/FormValidator":2,"../components/Menu":3,"../components/utils/utils":5}],7:[function(a,b,c){"use strict";var d=a("../components/FormValidator"),e=a("../components/PlacesAutoComplete"),f=new e("autocomplete");f.options={types:["(cities)"],componentRestrictions:{country:"nl"}},f.init();var g=new d("js-form");g.init()},{"../components/FormValidator":2,"../components/PlacesAutoComplete":4}]},{},[6,7]);