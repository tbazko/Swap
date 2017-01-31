'use strict';
const ItemModel = rootRequire('app/core/dataBaseModels/Item');

class Item {
  constructor(pageModel) {
    this.id = pageModel.itemId;
    this.currentUserId = pageModel.currentUserId;
  }

  get fullInfo() {
    let item = new ItemModel();
    // console.log(this.id, this.currentUserId);
    let fullInfoPromise = new Promise((resolve, reject) => {
      item
        .getWithRelations(this.id, '[user.[items], images, tags, swapForTags]', (err, items) => {
          console.log(err);
          if(err) {
            reject(err);
          }
          if(!!items.length) {
            let item = items[0];
            let itemBelongsToCurrentUser = false;
            let text = item.description;
            item.description = text.replace(/\n/g, '<br>');
            if(this.currentUserId && this.currentUserId === item.user.id) {
              itemBelongsToCurrentUser = true;
            }
            resolve({
              item: item,
              author: item.user,
              itemImage: item.images,
              itemBelongsToCurrentUser: itemBelongsToCurrentUser
            });
          } else {
            reject(null);
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
