'use strict';
const Item = rootRequire('app/core/dataBaseModels/Item');

module.exports = {
  template: 'itemListView',
  items: function(resolve, reject, model) {
    let item = new Item();

    item.getActiveWithRelations('[images, tags, swapForTags]', function(err, items) {
      if(items && items.length > 0) {
        resolve({items: items});        
      } else {
        resolve(null);
      }
    });
  }
}
