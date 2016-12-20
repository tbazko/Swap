'use strict';
const Item = rootRequire('app/core/dataBaseModels/Item');

module.exports = {
  template: 'itemListView',
  items: function(resolve, reject, model) {
    let item = new Item();

    item.getActiveWithRelations('[images, tags, swapForTags]', function(err, items) {
      if(items) {
        resolve({items: items, url: model.path });
      } else {
        resolve(null);
      }
    });
  }
}
