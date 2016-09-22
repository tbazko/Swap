"use strict";
const Base = require('./Base');
const DataBaseProduct = require('../dataBaseObjects/Product');
const DataBaseTag = require('../dataBaseObjects/Tag');
const cloudinary = require('../../../config/cloudinary');

class Product extends Base {
  constructor(id) {
    super(DataBaseProduct);
    this.idName = 'id';
  }

  set currentProduct(product) {
    this.product = product;
  }

  get currentProduct() {
    return this.product;
  }

  destroy(id, callback) {
    this.DataBaseObject
      .query()
      .where(this.identifier, '=', id)
      .first()
      .then(function(product) {
        var imagesPromise = product.$relatedQuery('images');

        imagesPromise.then(function(images) {
          images.forEach(function(image) {
            cloudinary.uploader.destroy(image.id);
          });
          return imagesPromise;
        }).then(function() {
          return product.$relatedQuery('images').delete();
        }).then(function() {
          return product.$relatedQuery('tags').unrelate();
        }).then(function() {
          return product.$relatedQuery('swapForTags').unrelate();
        }).then(function() {
          return product.$relatedQuery('swapRequestsAsSlave').unrelate();
        }).then(function() {
          return product.$relatedQuery('swapRequestsAsMaster').unrelate();
        }).then(function() {
          product.$query().delete().then(function() {
            callback(false);
          });
        })
      })
      .catch(function(err) {
        callback(err);
      });
  }

  create(fields, files, eventEmitter) {
    var name = files.upload.name.replace(/\.jpg|\.jpeg|\.bmp|\.gif/gmi, '');
    this.DataBaseObject
      .query()
      .insertAndFetch({
        name: fields.name,
        state: 'FOR_SALE',
        description: fields.description,
        user_id: fields.userId,
        condition: fields.productCondition
      })
      .then(function(newProduct) {
        this.currentProduct = newProduct;
        newProduct
          .$relatedQuery('images')
          .insert({id: `${newProduct.id}/${name}`, product_id: newProduct.id})
          .then(function() {
            cloudinary.uploader.upload(files.upload.path,
              function(result) {
              }, {public_id: `${newProduct.id}/${name}`}
            );

            if(fields.tags) {
              this.relateTags(fields.tags, 'tags');
            }
            if(fields.swapForTags) {
              this.relateTags(fields.swapForTags, 'swapForTags');
            }
            eventEmitter.emit('itemEdited', true, newProduct);
          }.bind(this));
      }.bind(this))
      .catch(function (err) {
        console.log(err);
      });
  }

  getActive(callback) {
    this.DataBaseObject
      .query()
      .whereIn('state', ['FOR_SALE', 'PENDING'])
      .then(function(products) {
        callback(null, products);
      })
      .catch(function (err) {
        callback(true, err);
      });
  }

  getActiveWithRelations(relations, callback) {
    this.getActive(function(err, products) {
      this.DataBaseObject
        .loadRelated(products, relations)
        .then(function(productsWithRelations) {
          callback(null, productsWithRelations);
        })
        .catch(function (err) {
          callback(true, err);
        });
    }.bind(this));
  }

  relateTags(tags, relation) {
    let tagsStr = tags.replace(/\s+/g, '');
    let tagsArray = tagsStr.split(',');
    this.identifier = 'name';

    tagsArray.forEach(function(value, index) {
      this.relateModel(DataBaseTag, relation, {name: value});
    }.bind(this));
    this.identifier = 'id';
  }

  relateModel(dataBaseObject, relation, modelData) {
    dataBaseObject
      .query()
      .where(this.identifier, modelData[this.identifier])
      .first()
      .then(function(model) {
        let relationsPromise = this.currentProduct.$relatedQuery(relation);
        // TODO: something broke in relationing
        if(model) {
          return relationsPromise.relate(model.id);
        } else {
          return relationsPromise.insert(modelData);
        }
      }.bind(this));
  }

  edit(fields, files, eventEmitter) {
    this.DataBaseObject
      .query()
      .patchAndFetchById(fields.productId, {
        name: fields.name,
        state: 'FOR_SALE',
        description: fields.description,
        user_id: fields.userId,
        condition: fields.productCondition
      })
      .then(function(editedProduct) {
        eventEmitter.emit('itemEdited', false, editedProduct);
      });
  }
}

module.exports = Product;
