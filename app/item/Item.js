'use strict';
const ItemDataBaseModel = rootRequire('app/core/dataBaseModels/Item');
const stredit = rootRequire('app/helpers/StringEditor');

class Item {
  constructor(pageModel) {
    this.itemId = pageModel.itemId;
    this.currentUserId = pageModel.currentUserId;
    this.itemDataBaseModel = new ItemDataBaseModel();
  }

  get coreInfo() {
    let coreInfoPromise = new Promise((resolve, reject) => {
      this.itemDataBaseModel.idName = 'id';
      this.itemDataBaseModel.getOneByIdentifier(this.itemId, (err, item) => {
        if(err) return console.log(err);
        if(!item) {
          resolve(null);
        } else {
          resolve(item);
        }
      });
    });
    return coreInfoPromise;
  }

  get fullInfo() {
    let fullInfoPromise = new Promise((resolve, reject) => {
      this.itemDataBaseModel.idName = 'id';
      this.itemDataBaseModel
        .getWithRelations(this.itemId, '[user.[items], images, tags, swapForTags]', (err, items) => {
          if(err) {
            reject(err);
          }
          if(!!items.length) {
            let item = items[0];
            let itemBelongsToCurrentUser = false;
            item.description = stredit.trim(item.description);
            if(this.currentUserId && this.currentUserId === item.user_id) {
              itemBelongsToCurrentUser = true;
            }
            resolve({
              item: item,
              author: item.user,
              itemImage: item.images,
              itemBelongsToCurrentUser: itemBelongsToCurrentUser
            });
          } else {
            resolve({
              item: null
            });
          }
        });
    });

    return fullInfoPromise;
  }

  get responseDataPromise() {
    return this.fullInfo;
  }
}

module.exports = Item;
