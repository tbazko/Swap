'use strict';
const ItemList = rootRequire('app/itemList/ItemList');
let defaultS = rootRequire('app/itemList/strategies/default');

describe('Item List', () => {
  let list = new ItemList({
    itemListStrategy: defaultS,
    path: '/',
    userId: 1,
    params: {
      id: 'anime'
    }
  });

  it(('should return items'), () => {
    list.items.then((items) => {
      expect(items).toEqual(jasmine.any(Object));
    });
  });
});
