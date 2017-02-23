'use strict';
const QueryBuilder = require('objection').QueryBuilder;
const TagSchema = rootRequire('app/core/dataBaseSchemas/Tag');
const ItemSchema = rootRequire('app/core/dataBaseSchemas/Item');

class ItemListFilter {
  constructor() {
    this.userId = undefined;
    this.categoryId = undefined;
    this.subcategoryId = undefined;
    this.onlyActive = undefined;
    this.searchTerm = undefined;
    this.tag = undefined;
    this.query = ItemSchema.query();
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

  byTag() {
    if(this.tag) {
      this.query = TagSchema.query()
      .where('name', this.tag)
      .eager('[items(byUser, byCategory, byActive).[images, swapForTags, tags]]', {
        byUser: this.byUser.bind(this),
        byCategory: this.byCategory.bind(this),
        byActive: this.byActive.bind(this)
      });
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

  then(successHandler, errorHandler) {
    return this.query.then(successHandler, errorHandler);
  }

  build() {
    if(this.tag) {
      return this
        .byTag().then((tags) => {
          return tags && tags.length ? tags[0].items : null;
        });
    } else {
      return this
              .byUser()
              .byCategory()
              .bySearchTerm()
              .byActive()
              .addRelations();
    }
  }
}

module.exports = ItemListFilter;
