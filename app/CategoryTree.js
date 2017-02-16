'use strict';
const CategoryModel = rootRequire('app/core/dataBaseModels/Category')

class CategoryTree {
  constructor() {
    this.categoryModel = new CategoryModel();
  }

  get allPromise() {
    return this.categoryModel.getAllCategories();
  }

  get parentsPromise() {
    return this.categoryModel.getAllParentCategories();
  }

  get responseDataPromise() {
    return new Promise((resolve, reject) => {
      this.allPromise.then((categories) => {
        resolve({categories: categories});
      }).catch((err) => reject(err));
    });
  }
}

module.exports = CategoryTree;
