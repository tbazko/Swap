'use strict';
const root = require('./rootRequireGlobal');
const ItemDataBaseModel = rootRequire('app/core/dataBaseModels/Item');

let itemOwnerUserId = 1;
let item = new ItemDataBaseModel();

afterAll((done) => {
  item.destroy(this.itemId).then((response) => {
    delete global.itemId;
    done();
  });
});

beforeAll((done) => {
  item.create({name: 'Testy test', description: 'test', itemCondition: '1', userId: itemOwnerUserId}, {upload: {size: 0}}).then((item) => {
    global.itemId = item.id;
    done();
  });
});

module.exports.ownerId = itemOwnerUserId;
