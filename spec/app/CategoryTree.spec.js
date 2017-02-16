'use strict';
const CategoryTree = rootRequire('app/CategoryTree');

describe('Category Tree', () => {
  var ct;
  beforeEach(() => {
    ct = new CategoryTree();
  });

  it('should initialise', () => {
    expect(ct).not.toBeUndefined();
  });

  it('should return all categories as array of objects', (done) => {
    ct.allPromise.then((categories) => {
      expect(categories).toEqual(jasmine.any(Array));
      done();
    });
  });

  it('category id should be a number ', (done) => {
    ct.allPromise.then((categories) => {
      expect(categories).toContain(jasmine.objectContaining({id: jasmine.any(Number)}));
      done();
    });
  });

  it('category name should be string', (done) => {
    ct.allPromise.then((categories) => {
      expect(categories).toContain(jasmine.objectContaining({name: jasmine.any(String)}));
      done();
    });
  });

  it('should return only parent categories', (done) => {
    ct.parentsPromise.then((parents) => {
      parents.forEach((parent) => {
        expect(parent.id % 100).toEqual(0);
        expect(parent.parent).toBeNull();
        done();
      });
    })
  });
});
