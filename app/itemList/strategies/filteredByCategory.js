'use strict';
const Category = rootRequire('app/core/dataBaseModels/Category');
const Item = rootRequire('app/core/dataBaseModels/Item');

module.exports = {
  items: function(resolve, reject, model) {
    var categoryName = model.params.id;
    var category = new Category();
    var item = new Item();
    category.idName = 'name';
    category.getOneByIdentifier(categoryName)
      .then((category) => category.id)
      .then((categoryId) => this._getActiveItems(item, categoryId))
      .then((items) => {
        if(items) {
          resolve({items: items, tag: categoryName});
        } else {
          resolve(null);
        }
      }).catch((err) => reject(err));
  },
  _getActiveItems: function(item, categoryId) {
    item.idName = 'category_id';
    return item.getActiveByRangeWithRelations([categoryId, categoryId + 99], '[images, tags, swapForTags]');
  }
}
