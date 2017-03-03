'use strict';
const ItemMock = rootRequire('spec/helpers/ItemMock');
const ItemListFilter = rootRequire('app/itemList/ItemListFilter');

describe('Item List Filter', () => {
  let filter;
  function defaultStrategy() {
    filter.userId = false;
    filter.categoryId = undefined;
    filter.onlyActive = true;
  }

  function userStrategy() {
    filter.userId = 1;
    filter.categoryId = undefined;
    filter.onlyActive = true;
  }

  function currentUserStrategy() {
    filter.userId = 1;
    filter.categoryId = undefined;
    filter.onlyActive = false;
  }

  beforeEach((done) => {
    filter = new ItemListFilter();
    done();
  });

  it(('should return only active items'), (done) => {
    filter.onlyActive = true;
    filter.byActive().exec((items) => {
      expect(items).toEqual(jasmine.any(Array));
      items.forEach((item, index) => {
        expect(item.status).toBe('for_sale');
      });
      done();
    }).catch((err) => console.log(err));
  });

  it(('should return only active items with relations'), (done) => {
    filter.byActive().addRelations().exec((items) => {
      expect(items).toEqual(jasmine.any(Array));
      items.forEach((item) => {
        expect(item.tags).toEqual(jasmine.any(Array));
      });
      done();
    });
  });

  it(('should return filtered by category active items with relations'), (done) => {
    filter.categoryId = 100;
    filter.byCategory().exec((items) => {
      expect(items).toEqual(jasmine.any(Array));
      items.forEach((item) => {
        let isSubCategory = filter.categoryId % 100 != 0;
        if(isSubCategory) {
          expect(item.sucategory_id).toEqual(filter.categoryId);
        } else {
          expect(item.category_id).toEqual(filter.categoryId);
        }
      });
      done();
    });
  });

  it(('should return filtered by user items'), (done) => {
    filter.userId = 1;
    filter.byUser().exec((items) => {
      items.forEach((item) => {
        expect(item.user_id).toEqual(1);
      });
      done();
    });
  });

  it('should return all active items', (done) => {
    defaultStrategy();
    filter.build().then((filter) => filter.query)
    .then((items) => {
      expect(items).toEqual(jasmine.any(Array));
      items.forEach((item, index) => {
        expect(item.status).toBe('for_sale');
      });
      done();
    });

  });

  it('should return all items', (done) => {
    defaultStrategy();
    filter.onlyActive = false;
    filter.build()
    .then((filter) => filter.query)
    .then((items) => {
      items.forEach((item, index) => {
        if(item.status === 'not_for_sale') {
          expect(item.status).toBe('not_for_sale');
          done();
        }
      });
    });
  });

  it('should return active items owned by user 1', (done) => {
    userStrategy();
    filter.build()
    .then((filter) => filter.query)
    .then((items) => {
      items.forEach((item, index) => {
        expect(item.status).toBe('for_sale');
        expect(item.user_id).toBe(filter.userId);
      });
      done();
    });
  });

  it('should return active items owned by user 1', (done) => {
    currentUserStrategy();
    filter.build()
    .then((filter) => filter.query)
    .then((items) => {
      items.forEach((item, index) => {
        if(item.status === 'not_for_sale') {
          expect(item.status).toBe('not_for_sale');
        } else {
          expect(item.status).toBe('for_sale');
        }
        expect(item.user_id).toBe(filter.userId);
      });
      done();
    });
  });

  it('should return all active items filtered by tag', (done) => {
    defaultStrategy();
    filter.tag = 'testTag';
    filter.build()
    .then((filter) => filter.query)
    .then((items) => {
      items.forEach((item, index) => {
        expect(item.name).toBe('Testy test');
        expect(item.id).toBe(global.itemId);
      });
    });
    done();
  });

  xit('should return null if tag doesn\'t exist', (done) => {
    defaultStrategy();
    filter.tag = 'tagWhichDoesntExist123';
    filter.build()
    .then((filter) => filter.query)
    .then((items) => {
      expect(items).toBeNull();
    });
    done();
  });
});
