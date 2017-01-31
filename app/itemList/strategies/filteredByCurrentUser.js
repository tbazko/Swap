'use strict';
const Item = rootRequire('app/core/dataBaseModels/Item');

module.exports = {
  template: 'userItemListView',
  items: function(resolve, reject, model) {
    let item = new Item();

    item.idName = 'user_id';
    item.getWithRelations(model.userId, '[images, tags, swapForTags]', function(err, items) {
      if(items) {
        resolve({items: items});
      } else {
        resolve(null);
      }
    });
  }
}
