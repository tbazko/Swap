"use strict";
const events = require('events');
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
    this.eventEmitter = new events.EventEmitter();
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

  getActiveByRangeWithRelations(idsRange, relations) {
    return this.DataBaseSchema
      .query()
      .whereBetween(this.idName, idsRange)
      .andWhere('status', ['for_sale'])
      .eager(relations);
  }

  relateTags(tags, relation) {
    let tagsStr = tags.replace(/\s+|,$/g, '');
    let tagsArray = this.uniqueArray(tagsStr.split(','));
    let promisesArray = [];
    this.idName = 'name';
    this.eventEmitter.once('lastItemAdded', () => {
      this.eventEmitter.emit('allTagsAdded');
    });
    tagsArray.forEach((value, index) => {
      this.relateModel(TagSchema, relation, {name: value}, tagsArray.length - 1 === index);
    });

    this.idName = 'id';
  }

  uniqueArray(arrArg) {
    return arrArg.filter((elem, pos, arr) => {
      return arr.indexOf(elem) == pos;
    });
  }

  relateModel(dataBaseSchema, relation, modelData, isLastItem) {
    dataBaseSchema
      .query()
      .where(this.idName, modelData.name)
      .first()
      .then((model) => {
        let relationsPromise = this.currentItem.$relatedQuery(relation);

        if(model) {
          relationsPromise.relate(model.id).then(() => {
            if(isLastItem) {
              this.eventEmitter.emit('lastItemAdded');
            }
          });
        } else {
          relationsPromise.insert(modelData).then(() => {
            if(isLastItem) {
              this.eventEmitter.emit('lastItemAdded');
            }
          });
        }
      }).catch((err) => {
        console.log(err)
      });
  }

  searchPromise(str) {
    return this.DataBaseSchema
      .query()
      .where('status', 'for_sale')
      .andWhere('name', 'like', '%' + str + '%')
      .orWhere('description', 'like', '%' + str + '%');
  }

  editAndGet(itemId, fields, files) {
    let itemEditor = new ItemEditor(this);
    return itemEditor.editAndGet(itemId, fields, files);
  }
}

module.exports = Item;
