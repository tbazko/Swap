define(['runtime'], function(jade){
  return function (locals, attrs, escape, rethrow, merge
/**/) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div class="paperStyle pl30 pr30 pt25 pb25 ml30 mb20 js-message"><p class="section-subtitle">Me:</p><p>' + escape((interp = locals.text) == null ? '' : interp) + '</p></div>');
}
return buf.join("");
};
});