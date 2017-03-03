'use strict';
const root = require('./rootRequireGlobal');
const ItemDataBaseModel = rootRequire('app/core/dataBaseModels/Item');

let itemOwnerUserId = 1;
let item = new ItemDataBaseModel();

beforeAll((done) => {
  item.create({
    name: 'Testy test',
    status: 'not_for_sale',
    categoryId: 100,
    description: 'test',
    itemCondition: '1',
    tags: 'testTag',
    userId: itemOwnerUserId
    }, {
      upload: {size: 0, name: 'Test.jpg'}
    }).then((item) => {
    global.itemId = item.id;
    done();
  });
});

afterAll((done) => {
  item.destroy(global.itemId).then((res) => {
    delete global.itemId;
    done();
  }).catch((err) => console.log(`Error from ItemMock ${err}`));
});

module.exports.ownerId = itemOwnerUserId;
