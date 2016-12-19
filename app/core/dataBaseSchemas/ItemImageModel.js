"use strict";
const DataBaseSchema = rootRequire('config/database').Model;

class ItemImage extends DataBaseSchema {
  static get tableName() {
    return 'itemImages';
  }

  static get relationMappings() {
    return {
      item: {
        relation: DataBaseSchema.BelongsToOneRelation,
        modelClass: __dirname + '/Item',
        join: {
          from: 'itemImages.item_id',
          to: 'items.id'
        }
      }
    }
  }
}

module.exports = ItemImage;
