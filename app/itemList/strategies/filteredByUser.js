'use strict';
const Item = rootRequire('app/core/dataBaseModels/Item');

module.exports = {
  template: 'userItemListView',
  items: function(resolve, reject, model) {
    let item = new Item();

    item.idName = 'user_id';
    item.getActiveByIdWithRelations(model.user.id, '[images, tags, swapForTags]', function(err, items) {
      if(items) {
        resolve(items);
      } else {
        resolve(null);
      }
    });
  }
}
