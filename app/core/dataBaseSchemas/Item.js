"use strict";
const DataBaseSchema = rootRequire('config/database').Model;

class Item extends DataBaseSchema {
  static get tableName() {
    return 'items';
  }

  static get relationMappings() {
    return {
      user: {
        relation: DataBaseSchema.BelongsToOneRelation,
        modelClass: __dirname + '/User',
        join: {
          from: 'items.user_id',
          to: 'users.id'
        }
      },
      category: {
        relation: DataBaseSchema.BelongsToOneRelation,
        modelClass: __dirname + '/Category',
        join: {
          from: 'items.category_id',
          to: 'categories.id'
        }
      },
      subcategory: {
        relation: DataBaseSchema.BelongsToOneRelation,
        modelClass: __dirname + '/SubCategory',
        join: {
          from: 'items.subcategory_id',
          to: 'categories.id'
        }
      },
      images: {
        relation: DataBaseSchema.HasManyRelation,
        modelClass: __dirname + '/ItemImage',
        join: {
          from: 'items.id',
          to: 'itemImages.item_id'
        }
      },
      tags: {
        relation: DataBaseSchema.ManyToManyRelation,
        modelClass: __dirname + '/Tag',
        join: {
          from: 'items.id',
          through: {
            from: 'items_tags.item_id',
            to: 'items_tags.tag_id'
          },
          to: 'tags.id'
        }
      },
      swapForTags: {
        relation: DataBaseSchema.ManyToManyRelation,
        modelClass: __dirname + '/Tag',
        join: {
          from: 'items.id',
          through: {
            from: 'items_swapForTags.item_id',
            to: 'items_swapForTags.tag_id'
          },
          to: 'tags.id'
        }
      },
      swapRequestsAsMaster: {
        relation: DataBaseSchema.ManyToManyRelation,
        modelClass: __dirname + '/SwapRequest',
        join: {
          from: 'items.id',
          through: {
            from: 'masterItems_swapRequests.item_id',
            to: 'masterItems_swapRequests.request_id'
          },
          to: 'swapRequests.id'
        }
      },
      swapRequestsAsSlave: {
        relation: DataBaseSchema.ManyToManyRelation,
        modelClass: __dirname + '/SwapRequest',
        join: {
          from: 'items.id',
          through: {
            from: 'slaveItems_swapRequests.item_id',
            to: 'slaveItems_swapRequests.request_id'
          },
          to: 'swapRequests.id'
        }
      }
    }
  }
}

module.exports = Item;
