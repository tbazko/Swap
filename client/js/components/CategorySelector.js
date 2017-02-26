function CategorySelector() {
  this.categorySelect = null;
  this.allSubCategories = null;
  this.subCategorySelect = null;
  this.savedId = null;
}

CategorySelector.prototype.init = function () {
  this.categorySelect = document.getElementById('category');
  this.subCategorySelect = document.getElementById('subcategory');

  if(this.categorySelect && this.subCategorySelect) {
    this.savedId = this.subCategorySelect.getAttribute('data-savedCategoryId');
    this.saveSubCategories();
    this.renderCurrentOptions();
    this.bindEvents();
  }
};

CategorySelector.prototype.saveSubCategories = function () {
  this.subCategorySelect = document.getElementById('subcategory');
  this.allSubCategories = [].slice.call(this.subCategorySelect.children);
};

CategorySelector.prototype.renderCurrentOptions = function () {
  if(this.savedId) {
    this.selectSavedValues();
    this.savedId = null;
  }
  this.filterOutSubCategories()
};

CategorySelector.prototype.bindEvents = function () {
  this.categorySelect.addEventListener('change', this.renderCurrentOptions.bind(this));
};

CategorySelector.prototype.filterOutSubCategories = function () {
  this.subCategoriesSetString = '';
  this.categoryId = this.categorySelect.options[this.categorySelect.selectedIndex].value;
  for(var i = 0, l = this.allSubCategories.length; i < l; i++) {
    if(this.allSubCategories[i].getAttribute('data-parentId') === this.categoryId) {
      this.subCategoriesSetString += this.allSubCategories[i].outerHTML;
    }
  }
  this.subCategorySelect.innerHTML = this.subCategoriesSetString;
};

CategorySelector.prototype.selectSavedValues = function () {
  this.allSubCategories.forEach((category) => {
    if(category.value === this.savedId) {
      var parentValue = category.getAttribute('data-parentId');
      var options = this.categorySelect.options;

      for(var i = 0, l = options.length; i < l; i++) {
        if(options[i].value === parentValue) {
          options[i].selected = true;
          category.setAttribute('selected', 'selected');
          return;
        }
      }
    }
  });
};

module.exports = CategorySelector;
