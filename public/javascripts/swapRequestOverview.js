!function a(b,c,d){function e(g,h){if(!c[g]){if(!b[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);var j=new Error("Cannot find module '"+g+"'");throw j.code="MODULE_NOT_FOUND",j}var k=c[g]={exports:{}};b[g][0].call(k.exports,function(a){var c=b[g][1][a];return e(c?c:a)},k,k.exports,a,b,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(a,b,c){"use strict";function d(){this.form=document.getElementById("messageForm"),this.textarea=document.getElementById("messageTextarea"),this.submitButton=document.getElementById("messageSubmit"),this.messages=document.getElementById("messages")}var e=a("./utils/utils"),f='<div class="paperStyle pl30 pr30 pt25 pb25 {{#message.senderName}}mr30{{/message.senderName}}{{^message.senderName}}ml30{{/message.senderName}} mb20 js-message"><p class="section-subtitle">{{#message.senderName}}{{.}}{{/message.senderName}}{{^message.senderName}}Me:{{/message.senderName}}</p><p>{{message.text}}</p></div>',g=a("mustache");d.prototype.init=function(){this.form&&(window.socket.emit("joinRoom",location.pathname),this.bindEvents())},d.prototype.bindEvents=function(){this.form.addEventListener("submit",this.onFormSubmit.bind(this)),window.socket.on("chatMessage",this.renderMessage.bind(this))},d.prototype.onFormSubmit=function(a){a.preventDefault();var b=this.textarea.value;""!==b&&(this.textarea.value="",window.socket.emit("chatMessage",b))},d.prototype.renderMessage=function(a){if(""!==a.text){var b=e.readCookie("logged");parseFloat(b)===a.senderId&&(a.senderName=!1);var c=g.render(f,{message:a}),d=document.createElement("div");d.innerHTML=c,this.messages.insertBefore(d.firstChild,this.messages.firstChild)}},b.exports=d},{"./utils/utils":6,mustache:7}],2:[function(a,b,c){"use strict";function d(){this.id="requestCounter",this.count=0}d.prototype.update=function(){var a=document.getElementById(this.id);a.innerHTML=++this.count},b.exports=d},{}],3:[function(a,b,c){"use strict";function d(a){this.forms=document.getElementsByClassName(a),this.currentForm=null,this.minPasswordLength=6,this.errorMessages={invalidEmail:"Invalid email format",invalidCharacters:"Contains forbidden symbols",minPasswordLength:"Password should contain at least 6 symbols"},this.errors={},this.emailRegex=/(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/i,this.urlRegex=/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)/}var e=a("./utils/utils");d.prototype.init=function(){this.forms.length>0&&this.bindEvents()},d.prototype.bindEvents=function(){document.addEventListener("blur",this.onBlur.bind(this),!0),document.addEventListener("keyup",this.onKeyUp.bind(this),!0),document.addEventListener("submit",this.onSubmit.bind(this),!0)},d.prototype.onBlur=function(a){var b=a.target;this.setCurrentForm(b),this.validateInput(b)},d.prototype.onKeyUp=function(a){var b=a.target;(b.hasAttribute("type")&&"text"===b.getAttribute("type")||e.selectorMatches(b,"textarea"))&&(this.setCurrentForm(b),this.validateInput(b))},d.prototype.onSubmit=function(a){a.preventDefault();var b=a.target;this.setCurrentForm(b),this.isValidForm()&&this.submitForm()},d.prototype.setCurrentForm=function(a){for(;a!=document;)a&&e.selectorMatches(a,".js-form")&&(this.currentForm=a),a=a.parentNode},d.prototype.validateInput=function(a){if(""!==a.value){var b=a.hasAttribute("type")&&"email"===a.getAttribute("type"),c=a.hasAttribute("type")&&"text"===a.getAttribute("type")||e.selectorMatches(a,"textarea"),d=a.hasAttribute("type")&&"password"===a.getAttribute("type")&&"true"===a.getAttribute("data-validate");b?this.validateEmail(a):c?(this.validateForRestrictedCharacters(a),this.removeEmails(a),this.removeUrls(a)):d&&this.validatePassword(a)}},d.prototype.validateEmail=function(a){this.isEmail(a.value)?(e.addClass(a,"is-valid"),e.removeClass(a,"is-invalid"),this.hideInputError(a)):(e.removeClass(a,"is-valid"),e.addClass(a,"is-invalid"),this.showInputError(a,this.errorMessages.invalidEmail))},d.prototype.validateForRestrictedCharacters=function(a){a.getAttribute("data-custom-validation")||(this.isValidString(a.value)?(e.addClass(a,"is-valid"),e.removeClass(a,"is-invalid"),this.hideInputError(a)):(e.removeClass(a,"is-valid"),e.addClass(a,"is-invalid"),this.showInputError(a,this.errorMessages.invalidCharacters)))},d.prototype.isValidForm=function(){var a=this.currentForm.querySelector(".is-invalid");return!a},d.prototype.submitForm=function(){this.currentForm.getAttribute("data-ajax-submit")||this.currentForm.submit()},d.prototype.removeEmails=function(a){this.emailRegex.test(a.value)&&(a.value=a.value.replace(this.emailRegex,"((Forbidden))"))},d.prototype.removeUrls=function(a){this.urlRegex.test(a.value)&&(a.value=a.value.replace(this.urlRegex,"((Forbidden))"))},d.prototype.validatePassword=function(a){a.value.length<6?(e.removeClass(a,"is-valid"),e.addClass(a,"is-invalid"),this.showInputError(a,this.errorMessages.minPasswordLength)):(e.addClass(a,"is-valid"),e.removeClass(a,"is-invalid"),this.hideInputError(a))},d.prototype.isValidString=function(a){var b=/^[а-яА-ЯЁёІіЇїҐґЄєЩщa-zA-Z0-9.,!"'_\-()@?#:$;\s\u00A0\u000D\u000A\000C]+$/gm;return b.test(a)},d.prototype.showInputError=function(a,b){if(a.nextElementSibling){var c=a.nextElementSibling;if(e.selectorMatches(c,".inputError"))return}var d=document.createElement("div");d.innerText=b,e.addClass(d,"inputError"),e.insertAfter(d,a)},d.prototype.hideInputError=function(a){var b,c;a.nextElementSibling&&(b=a.nextElementSibling,c=b.parentNode,e.selectorMatches(b,".inputError")&&c.removeChild(b))},d.prototype.isEmail=function(a){var b=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;return b.test(a)},b.exports=d},{"./utils/utils":6}],4:[function(a,b,c){"use strict";function d(a,b,c){this.menu=document.getElementsByClassName(a)[0],this.trigger=document.getElementsByClassName(b)[0],this.container=document.getElementById("main"),this.navigation=document.getElementById("navigation"),this.navigationHeight=this.navigation.offsetHeight,this.lastKnownScrollPosition=0,this.ticking=!1}d.prototype.init=function(){this.bindEvents()},d.prototype.bindEvents=function(){this.trigger.addEventListener("click",this.toggleMenu.bind(this),!1),window.addEventListener("scroll",this.onScrollThrottle.bind(this),!1),window.addEventListener("optimizedResize",this.setNavigationHeight.bind(this),!1)},d.prototype.onScrollThrottle=function(){this.lastKnownScrollPosition=window.scrollY,this.ticking||window.requestAnimationFrame(function(){this.getSticky(this.lastKnownScrollPosition),this.ticking=!1}.bind(this)),this.ticking=!0},d.prototype.setNavigationHeight=function(){this.navigation.style.height="",this.navigationHeight=this.navigation.offsetHeight,this.lastKnownScrollPosition&&this.getSticky(this.lastKnownScrollPosition)},d.prototype.toggleMenu=function(){this.menu.classList.toggle("is-active"),this.trigger.classList.toggle("is-active"),this.container.classList.toggle("is-active-menu")},d.prototype.getSticky=function(){var a=40,b=this.lastKnownScrollPosition<this.navigationHeight-a?this.navigationHeight-this.lastKnownScrollPosition:a;this.navigation.style.height=b+"px",this.lastKnownScrollPosition>(this.navigationHeight-a)/2?this.navigation.classList.add("is-sticky"):this.navigation.classList.remove("is-sticky")},b.exports=d},{}],5:[function(a,b,c){"use strict";function d(){this.swapRequestButtons=document.getElementById("swapRequestOverviewButtons"),this.acceptButton=document.getElementById("acceptSwapRequest"),this.declineButton=document.getElementById("declineSwapRequest"),this.statusLabels=document.getElementsByClassName("statusLabel"),this.mainContainer=document.getElementById("main"),this.status=null}var e=a("./utils/utils");d.prototype.init=function(){this.acceptButton&&this.declineButton&&this.bindEvents(),this.listenToSockets()},d.prototype.bindEvents=function(){this.acceptButton.addEventListener("click",this.emitStatusChange.bind(this,"accepted")),this.declineButton.addEventListener("click",this.emitStatusChange.bind(this,"declined"))},d.prototype.listenToSockets=function(){window.socket.on("updateStatus",this.updateView.bind(this))},d.prototype.emitStatusChange=function(a,b){b.preventDefault(),window.socket.emit("statusChanged",a)},d.prototype.updateView=function(a){this.status=a,this.updateStatusLabels(),this.updateMainContainer(),this.removeSwapRequestButtons()},d.prototype.updateStatusLabels=function(){for(var a=0,b=this.statusLabels.length;a<b;a++){this.statusLabels[a].className="statusLabel statusLabel--"+this.status;var c=document.createElement("p");c.innerText=this.status,this.statusLabels[a].innerHTML="",this.statusLabels[a].appendChild(c)}},d.prototype.updateMainContainer=function(){this.mainContainer.className="main-container "+this.status},d.prototype.removeSwapRequestButtons=function(){this.swapRequestButtons&&(e.addClass(this.swapRequestButtons,"is-hidden"),setTimeout(function(){this.swapRequestButtons.innerHTML=""}.bind(this),250))},b.exports=d},{"./utils/utils":6}],6:[function(a,b,c){"use strict";var d;b.exports={closest:function a(b,c){for(var a;b;){if(a=b,a&&this.selectorMatches(a,c))return a;b=a.parentElement}return null},readCookie:function(a){if(d)return d[a];var b=document.cookie.split("; ");d={};for(var c=b.length-1;c>=0;c--){var e=b[c].split("=");d[e[0]]=e[1]}return d[a]},selectorMatches:function(a,b){var c=Element.prototype,d=c.matches||c.webkitMatchesSelector||c.mozMatchesSelector||c.msMatchesSelector||function(a){return[].indexOf.call(document.querySelectorAll(a),this)!==-1};return d.call(a,b)},addClass:function(a,b){this.selectorMatches(a,"."+b)||(""!=a.className?a.className+=" "+b:a.className=b)},removeClass:function(a,b){var c=new RegExp("(?:^|\\s)"+b+"(?!\\S)","gi");a.className=a.className.replace(c,"")},insertAfter:function(a,b){b.parentNode.insertBefore(a,b.nextSibling)},trim:function(a,b){return a?this.rtrim(this.ltrim(a,b),b):a},ltrim:function(a,b){if(!a)return a;var c=b?new RegExp("^["+b+"]+","g"):/^\s+/g;return a.replace(c,"")},rtrim:function(a,b){if(!a)return a;for(var c=b?new RegExp("["+b+"]"):/\s/,d=a.length-1;d>=0&&c.test(a[d]);)d--;return d<a.length?a.substr(0,d+1):a}}},{}],7:[function(a,b,c){"use strict";var d="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&"function"==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a};!function(a,b){"object"===("undefined"==typeof c?"undefined":d(c))&&c&&"string"!=typeof c.nodeName?b(c):"function"==typeof define&&define.amd?define(["exports"],b):(a.Mustache={},b(a.Mustache))}(void 0,function(a){function b(a){return"function"==typeof a}function c(a){return q(a)?"array":"undefined"==typeof a?"undefined":d(a)}function e(a){return a.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}function f(a,b){return null!=a&&"object"===("undefined"==typeof a?"undefined":d(a))&&b in a}function g(a,b){return r.call(a,b)}function h(a){return!g(s,a)}function i(a){return String(a).replace(/[&<>"'`=\/]/g,function(a){return t[a]})}function j(b,c){function d(){if(r&&!s)for(;p.length;)delete o[p.pop()];else p=[];r=!1,s=!1}function f(a){if("string"==typeof a&&(a=a.split(v,2)),!q(a)||2!==a.length)throw new Error("Invalid tags: "+a);g=new RegExp(e(a[0])+"\\s*"),i=new RegExp("\\s*"+e(a[1])),j=new RegExp("\\s*"+e("}"+a[1]))}if(!b)return[];var g,i,j,n=[],o=[],p=[],r=!1,s=!1;f(c||a.tags);for(var t,z,A,B,C,D,E=new m(b);!E.eos();){if(t=E.pos,A=E.scanUntil(g))for(var F=0,G=A.length;F<G;++F)B=A.charAt(F),h(B)?p.push(o.length):s=!0,o.push(["text",B,t,t+1]),t+=1,"\n"===B&&d();if(!E.scan(g))break;if(r=!0,z=E.scan(y)||"name",E.scan(u),"="===z?(A=E.scanUntil(w),E.scan(w),E.scanUntil(i)):"{"===z?(A=E.scanUntil(j),E.scan(x),E.scanUntil(i),z="&"):A=E.scanUntil(i),!E.scan(i))throw new Error("Unclosed tag at "+E.pos);if(C=[z,A,t,E.pos],o.push(C),"#"===z||"^"===z)n.push(C);else if("/"===z){if(D=n.pop(),!D)throw new Error('Unopened section "'+A+'" at '+t);if(D[1]!==A)throw new Error('Unclosed section "'+D[1]+'" at '+t)}else"name"===z||"{"===z||"&"===z?s=!0:"="===z&&f(A)}if(D=n.pop())throw new Error('Unclosed section "'+D[1]+'" at '+E.pos);return l(k(o))}function k(a){for(var b,c,d=[],e=0,f=a.length;e<f;++e)b=a[e],b&&("text"===b[0]&&c&&"text"===c[0]?(c[1]+=b[1],c[3]=b[3]):(d.push(b),c=b));return d}function l(a){for(var b,c,d=[],e=d,f=[],g=0,h=a.length;g<h;++g)switch(b=a[g],b[0]){case"#":case"^":e.push(b),f.push(b),e=b[4]=[];break;case"/":c=f.pop(),c[5]=b[2],e=f.length>0?f[f.length-1][4]:d;break;default:e.push(b)}return d}function m(a){this.string=a,this.tail=a,this.pos=0}function n(a,b){this.view=a,this.cache={".":this.view},this.parent=b}function o(){this.cache={}}var p=Object.prototype.toString,q=Array.isArray||function(a){return"[object Array]"===p.call(a)},r=RegExp.prototype.test,s=/\S/,t={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;","`":"&#x60;","=":"&#x3D;"},u=/\s*/,v=/\s+/,w=/\s*=/,x=/\s*\}/,y=/#|\^|\/|>|\{|&|=|!/;m.prototype.eos=function(){return""===this.tail},m.prototype.scan=function(a){var b=this.tail.match(a);if(!b||0!==b.index)return"";var c=b[0];return this.tail=this.tail.substring(c.length),this.pos+=c.length,c},m.prototype.scanUntil=function(a){var b,c=this.tail.search(a);switch(c){case-1:b=this.tail,this.tail="";break;case 0:b="";break;default:b=this.tail.substring(0,c),this.tail=this.tail.substring(c)}return this.pos+=b.length,b},n.prototype.push=function(a){return new n(a,this)},n.prototype.lookup=function(a){var c,d=this.cache;if(d.hasOwnProperty(a))c=d[a];else{for(var e,g,h=this,i=!1;h;){if(a.indexOf(".")>0)for(c=h.view,e=a.split("."),g=0;null!=c&&g<e.length;)g===e.length-1&&(i=f(c,e[g])),c=c[e[g++]];else c=h.view[a],i=f(h.view,a);if(i)break;h=h.parent}d[a]=c}return b(c)&&(c=c.call(this.view)),c},o.prototype.clearCache=function(){this.cache={}},o.prototype.parse=function(a,b){var c=this.cache,d=c[a];return null==d&&(d=c[a]=j(a,b)),d},o.prototype.render=function(a,b,c){var d=this.parse(a),e=b instanceof n?b:new n(b);return this.renderTokens(d,e,c,a)},o.prototype.renderTokens=function(a,b,c,d){for(var e,f,g,h="",i=0,j=a.length;i<j;++i)g=void 0,e=a[i],f=e[0],"#"===f?g=this.renderSection(e,b,c,d):"^"===f?g=this.renderInverted(e,b,c,d):">"===f?g=this.renderPartial(e,b,c,d):"&"===f?g=this.unescapedValue(e,b):"name"===f?g=this.escapedValue(e,b):"text"===f&&(g=this.rawValue(e)),void 0!==g&&(h+=g);return h},o.prototype.renderSection=function(a,c,e,f){function g(a){return h.render(a,c,e)}var h=this,i="",j=c.lookup(a[1]);if(j){if(q(j))for(var k=0,l=j.length;k<l;++k)i+=this.renderTokens(a[4],c.push(j[k]),e,f);else if("object"===("undefined"==typeof j?"undefined":d(j))||"string"==typeof j||"number"==typeof j)i+=this.renderTokens(a[4],c.push(j),e,f);else if(b(j)){if("string"!=typeof f)throw new Error("Cannot use higher-order sections without the original template");j=j.call(c.view,f.slice(a[3],a[5]),g),null!=j&&(i+=j)}else i+=this.renderTokens(a[4],c,e,f);return i}},o.prototype.renderInverted=function(a,b,c,d){var e=b.lookup(a[1]);if(!e||q(e)&&0===e.length)return this.renderTokens(a[4],b,c,d)},o.prototype.renderPartial=function(a,c,d){if(d){var e=b(d)?d(a[1]):d[a[1]];return null!=e?this.renderTokens(this.parse(e),c,d,e):void 0}},o.prototype.unescapedValue=function(a,b){var c=b.lookup(a[1]);if(null!=c)return c},o.prototype.escapedValue=function(b,c){var d=c.lookup(b[1]);if(null!=d)return a.escape(d)},o.prototype.rawValue=function(a){return a[1]},a.name="mustache.js",a.version="2.2.1",a.tags=["{{","}}"];var z=new o;a.clearCache=function(){return z.clearCache()},a.parse=function(a,b){return z.parse(a,b)},a.render=function(a,b,d){if("string"!=typeof a)throw new TypeError('Invalid template! Template should be a "string" but "'+c(a)+'" was given as the first argument for mustache#render(template, view, partials)');return z.render(a,b,d)},a.to_html=function(c,d,e,f){var g=a.render(c,d,e);return b(f)?void f(g):g},a.escape=i,a.Scanner=m,a.Context=n,a.Writer=o})},{}],8:[function(a,b,c){"use strict";var d=a("../components/utils/utils").readCookie,e=a("../components/Menu"),f=a("../components/Counter");if(d("logged")){var g=d("logged");window.socket=io();var h,i=window.socket;i.on("newSwapRequest",function(a){h||(h=new f),h.update()}),i.emit("joinRoom",g)}var j=new e("js-menu-wrapper","js-menu-trigger");j.init()},{"../components/Counter":2,"../components/Menu":4,"../components/utils/utils":6}],9:[function(a,b,c){"use strict";var d=a("../components/FormValidator"),e=a("../components/Chat"),f=a("../components/SwapRequestStatusChanger"),g=new e,h=new f,i=new d;g.init(),h.init(),i.init()},{"../components/Chat":1,"../components/FormValidator":3,"../components/SwapRequestStatusChanger":5}]},{},[8,9]);