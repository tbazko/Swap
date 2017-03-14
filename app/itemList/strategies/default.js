'use strict';
const Item = rootRequire('app/core/dataBaseModels/Item');

module.exports = {
  configureFilter: function(model) {
    model.filter.userId = false;
    model.filter.activeItems = true;
  }
}
