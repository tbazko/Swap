define(['runtime'], function(jade){
  return function (locals, attrs, escape, rethrow, merge
/**/) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div class="swapFields"> <input');
buf.push(attrs({ 'type':("text"), 'placeholder':("Email"), 'name':("email"), 'value':("" + (locals.email) + "") }, {"type":true,"placeholder":true,"name":true,"value":true}));
buf.push('/><input type="text" placeholder="Phone" name="phone"/><textarea name="message" placeholder="Leave a message for the owner"></textarea></div>');
// iterate locals
;(function(){
  if ('number' == typeof locals.length) {

    for (var $index = 0, $$l = locals.length; $index < $$l; $index++) {
      var product = locals[$index];

buf.push('<label');
buf.push(attrs({ 'data-product-id':("" + (product.id) + ""), 'for':("" + (product.id) + ""), "class": ('product') + ' ' + ('product--inSwapList') }, {"data-product-id":true,"for":true}));
buf.push('><div class="img-container">' + ((interp = product.image) == null ? '' : interp) + '</div><div class="content-container"><h4 class="product-title">');
var __val__ = product.name
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</h4><p class="product-tag-title"><b>Tags:&nbsp;');
// iterate product.tags
;(function(){
  if ('number' == typeof product.tags.length) {

    for (var $index = 0, $$l = product.tags.length; $index < $$l; $index++) {
      var tag = product.tags[$index];

buf.push('<a');
buf.push(attrs({ 'href':("/tag/" + (tag.name) + "") }, {"href":true}));
buf.push('>' + escape((interp = tag.name) == null ? '' : interp) + ',&#32;</a>');
    }

  } else {
    var $$l = 0;
    for (var $index in product.tags) {
      $$l++;      var tag = product.tags[$index];

buf.push('<a');
buf.push(attrs({ 'href':("/tag/" + (tag.name) + "") }, {"href":true}));
buf.push('>' + escape((interp = tag.name) == null ? '' : interp) + ',&#32;</a>');
    }

  }
}).call(this);

buf.push('</b></p></div><input');
buf.push(attrs({ 'id':("" + (product.id) + ""), 'name':("productId"), 'value':("" + (product.id) + ""), 'type':("checkbox"), "class": ('selectItem') }, {"id":true,"name":true,"value":true,"type":true}));
buf.push('/></label>');
    }

  } else {
    var $$l = 0;
    for (var $index in locals) {
      $$l++;      var product = locals[$index];

buf.push('<label');
buf.push(attrs({ 'data-product-id':("" + (product.id) + ""), 'for':("" + (product.id) + ""), "class": ('product') + ' ' + ('product--inSwapList') }, {"data-product-id":true,"for":true}));
buf.push('><div class="img-container">' + ((interp = product.image) == null ? '' : interp) + '</div><div class="content-container"><h4 class="product-title">');
var __val__ = product.name
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</h4><p class="product-tag-title"><b>Tags:&nbsp;');
// iterate product.tags
;(function(){
  if ('number' == typeof product.tags.length) {

    for (var $index = 0, $$l = product.tags.length; $index < $$l; $index++) {
      var tag = product.tags[$index];

buf.push('<a');
buf.push(attrs({ 'href':("/tag/" + (tag.name) + "") }, {"href":true}));
buf.push('>' + escape((interp = tag.name) == null ? '' : interp) + ',&#32;</a>');
    }

  } else {
    var $$l = 0;
    for (var $index in product.tags) {
      $$l++;      var tag = product.tags[$index];

buf.push('<a');
buf.push(attrs({ 'href':("/tag/" + (tag.name) + "") }, {"href":true}));
buf.push('>' + escape((interp = tag.name) == null ? '' : interp) + ',&#32;</a>');
    }

  }
}).call(this);

buf.push('</b></p></div><input');
buf.push(attrs({ 'id':("" + (product.id) + ""), 'name':("productId"), 'value':("" + (product.id) + ""), 'type':("checkbox"), "class": ('selectItem') }, {"id":true,"name":true,"value":true,"type":true}));
buf.push('/></label>');
    }

  }
}).call(this);

}
return buf.join("");
};
});