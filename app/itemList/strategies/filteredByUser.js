'use strict';
const Item = rootRequire('app/core/dataBaseModels/Item');

module.exports = {
  configureFilter: function(model) {
    model.filter.userId = model.userId;
    model.filter.activeItems = true;
  }
}
