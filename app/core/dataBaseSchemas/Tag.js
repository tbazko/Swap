"use strict";
const DataBaseSchema = rootRequire('config/database').Model;

class Tag extends DataBaseSchema {
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
            from: 'items_tags.tag_id',
            to: 'items_tags.item_id'
          },
          to: 'items.id'
        }
      }
    }
  }
}

module.exports = Tag;
