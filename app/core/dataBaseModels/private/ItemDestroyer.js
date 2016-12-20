'use strict';
const cloudinary = rootRequire('config/cloudinary');

class ItemDestroyer {
  constructor(dataBaseObject) {
    this._DBschema = dataBaseObject.DataBaseSchema;
    this._DBobject = dataBaseObject;
  }

  destroy(id) {
    let destroyItemPromise = new Promise((resolve, reject) => {
      this._DBschema
        .query()
        .where(this._DBobject.idName, '=', id)
        .first()
        .then(function(item) {
          var imagesPromise = item.$relatedQuery('images');

          imagesPromise.then((images) => {
            images.forEach((image) => {
              cloudinary.uploader.destroy(image.id);
            });
            return imagesPromise;
          }).then(() => {
            return item.$relatedQuery('images').delete();
          }).then(() => {
            return item.$relatedQuery('tags').unrelate();
          }).then(() => {
            return item.$relatedQuery('swapForTags').unrelate();
          }).then(() => {
            return item.$relatedQuery('swapRequestsAsSlave').unrelate();
          }).then(() => {
            return item.$relatedQuery('swapRequestsAsMaster').unrelate();
          }).then(() => {
            item.$query().delete().then(() => {
              resolve('destroyed');
            });
          })
        })
        .catch((err) => {
          reject(err)
        });
    });
    return destroyItemPromise;
  }
}

module.exports = ItemDestroyer;
