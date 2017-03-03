'use strict';
const knex = rootRequire('config/database').knex;
const objection = require('objection');
const TagSchema = rootRequire('app/core/dataBaseSchemas/Tag');
const ItemSchema = rootRequire('app/core/dataBaseSchemas/Item');
const events = require('events');

class ItemListFilter {
  constructor() {
    this.userId = undefined;
    this.categoryId = undefined;
    this.subcategoryId = undefined;
    this.onlyActive = undefined;
    this.searchTerm = undefined;
    this.tag = undefined;
    this.query = ItemSchema.query();
    this.eventEmitter = new events.EventEmitter();
  }

  byUser(query) {
    if(query) this.query = query;
    if(this.userId) {
      this.query = this.query.where('user_id', this.userId);
    }
    return this;
  }

  byCategory(query) {
    if(query) this.query = query;
    if(this.categoryId) {
      if(this.subcategoryId) {
        this.query = this.query.where('subcategory_id', this.subcategoryId);
      } else {
        this.query = this.query.where('category_id', this.categoryId);
      }
    }
    return this;
  }

  byActive(query) {
    if(this.onlyActive) {
      if(query) this.query = query;
      this.query = this.query.andWhere('status', 'for_sale');
    }
    return this;
  }

  bySearchTerm(query) {
    if(query) this.query = query;
    if(this.searchTerm) {
      let term = this.searchTerm;
      this.query = this.query.where(function(builder) {
        builder.where('name', 'like', `%${term}%`)
        .orWhere('description', 'like', `%${term}%`)
      });
    }
    return this;
  }

  addRelations() {
    this.query = this.query.eager('[images, tags, swapForTags]');
    return this;
  }

  exec(successHandler, errorHandler) {
    return this.query.then(successHandler, errorHandler);
  }

  byTag() {
    if(this.tag) {
      return TagSchema.query()
        .where('name', this.tag)
        .first()
        .then((tag) => {
          if(!tag) return new Error('NOTAG');
          this.query = this.query
            .from((builder) => {
              builder.select(knex.raw('items.*, items_tags.tag_id as objectiontmpjoin0 from items'))
              .join('items_tags', 'items_tags.item_id', '=', 'items.id')
              .whereIn('items_tags.tag_id', tag.id).as(knex.raw('t'));
            });
        });
    }
    return this;
  }

  build() {
    if(this.tag) {
      return this.byTag()
        .then(() => this._build());
    } else {
      return Promise.resolve(this._build());
    }
  }

  _build() {
    return this
      .byUser()
      .byCategory()
      .bySearchTerm()
      .byActive()
      .addRelations();
  }
}

module.exports = ItemListFilter;
