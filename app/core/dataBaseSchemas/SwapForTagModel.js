"use strict";
const DataBaseSchema = rootRequire('config/database').Model;

class SwapForTag extends DataBaseSchema {
  static get tableName() {
    return 'tags';
  }

  static get relationMappings() {
    return {
      items: {
        relation: DataBaseSchema.ManyToManyRelation,
        modelClass: __dirname + '/Item',
        join: {
          from: 'tags.id',
          through: {
            from: 'items_swapForTags.tag_id',
            to: 'items_swapForTags.item_id'
          },
          to: 'items.id'
        }
      }
    }
  }
}

module.exports = SwapForTag;
