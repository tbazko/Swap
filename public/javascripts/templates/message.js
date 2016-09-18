define(['runtime'], function(pug){
  return function (locals, attrs, escape, rethrow, merge
/**/) {
attrs = attrs || pug.attrs; escape = escape || pug.escape; rethrow = rethrow || pug.rethrow; merge = merge || pug.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div class="paperStyle pl30 pr30 pt25 pb25 ml30 mb20 js-message"><p class="section-subtitle">Me:</p><p>' + escape((interp = locals.text) == null ? '' : interp) + '</p></div>');
}
return buf.join("");
};
});