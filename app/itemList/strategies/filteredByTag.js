'use strict';
const Tag = rootRequire('app/core/dataBaseModels/Tag');

module.exports = {
  template: 'itemListView',
  items: function(resolve, reject, model) {
    var tagName = model.params.id;
    var tag = new Tag();
    tag.idName = 'name';
    tag.getWithRelations(tagName, '[items.[images, swapForTags]]', function(err, tags) {
      if(err) {reject(err)}
      if(tags) {
        resolve({items: tags[0].items, url: model.path, tag: tagName});
      } else {
        resolve(null);
      }
    });
  }
}
