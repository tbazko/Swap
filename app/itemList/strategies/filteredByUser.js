'use strict';
const Item = rootRequire('app/core/dataBaseObjects/Item');

module.exports = {
  template: 'userItemListView',
  items: function(resolve, reject, model) {
    let item = new Item();
    let user = {
      userId: model.user.id,
      email: model.user.email
    };

    item.identifier = 'user_id';
    item.getWithRelations(model.user.id, '[images, tags, swapForTags]', function(err, items) {
      if(items) {
        resolve({ items: items, url: model.path, user: user });
      } else {
        resolve(null);
      }
    });
  }
}
