"use strict";
const Base = require('./Base');
const ItemSchema = require('../dataBaseSchemas/Item');
const TagSchema = require('../dataBaseSchemas/Tag');
const cloudinary = rootRequire('config/cloudinary');
const ItemCreator = require('./private/ItemCreator');
const ItemEditor = require('./private/ItemEditor');
const ItemDestroyer = require('./private/ItemDestroyer');

class Item extends Base {
  constructor(id) {
    super(ItemSchema);
    this.idName = 'id';
  }

  set currentItem(item) {
    this.item = item;
  }

  get currentItem() {
    return this.item;
  }

  destroy(id, callback) {
    let itemDestroyer = new ItemDestroyer(this);
    return itemDestroyer.destroy(id);
  }

  create(fields, files) {
    let itemCreator = new ItemCreator(this);
    return itemCreator.create(fields, files);
  }

  getActive(callback) {
    this.DataBaseSchema
      .query()
      .whereIn('status', ['for_sale'])
      .then(function(items) {
        callback(null, items);
      })
      .catch(function (err) {
        callback(true, err);
      });
  }

  getActiveWithRelations(relations, callback) {
    this.getActive(function(err, items) {
      this.DataBaseSchema
        .loadRelated(items, relations)
        .then(function(itemsWithRelations) {
          callback(null, itemsWithRelations);
        })
        .catch(function (err) {
          callback(true, err);
        });
    }.bind(this));
  }

  getActiveByIdWithRelations(id, relations, callback) {
    this.DataBaseSchema
      .query()
      .whereIn('status', ['for_sale'])
      .andWhere(this.idName, '=', id)
      .eager(relations)
      .then(function(items) {
        callback(null, items);
      })
      .catch(function (err) {
        callback(true, err);
      });
  }

  relateTags(tags, relation) {
    let tagsStr = tags.replace(/\s+/g, '');
    let tagsArray = tagsStr.split(',');
    this.idName = 'name';

    tagsArray.forEach(function(value, index) {
      this.relateModel(TagSchema, relation, {name: value});
    }.bind(this));
    this.idName = 'id';
  }

  relateModel(dataBaseSchema, relation, modelData) {
    dataBaseSchema
      .query()
      .where(this.idName, modelData[this.idName])
      .first()
      .then(function(model) {
        let relationsPromise = this.currentItem.$relatedQuery(relation);
        // TODO: something broke in relationing
        if(model) {
          return relationsPromise.relate(model.id);
        } else {
          return relationsPromise.insert(modelData);
        }
      }.bind(this));
  }

  editAndGet(itemId, fields, files) {
    let itemEditor = new ItemEditor(this);
    return itemEditor.editAndGet(itemId, fields, files);
  }
}

module.exports = Item;
