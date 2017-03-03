'use strict';
const Pagination = rootRequire('app/Pagination');
const ItemSchema = rootRequire('app/core/dataBaseSchemas/Item');

describe('Pagination', function() {
  let p = new Pagination({page: 1});
  p.pageSize = 2;

  it('should initialise', () => {
    expect(p).not.toBeUndefined();
  });

  xit('should return number of rows', (done) => {
    p.queryWithItems = ItemSchema.query();
    p.numberOfRows.then((response) => {
      expect(response).toEqual(jasmine.any(Array));
      expect(response).toEqual([jasmine.any(ItemSchema)]);
      expect(response).toContain(jasmine.objectContaining({numberOfRows: jasmine.any(Number)}));
      p.testPageCount = Math.ceil(response[0].numberOfRows / p.pageSize);
      done();
    });
  });

  it('should return current number of page', () => {
    expect(p.currentPage).toEqual(1);
  });

  it('should return pageSize of items per page', () => {
    expect(p.pageSize).toEqual(p.pageSize);
  });

  it('should return start number', () => {
    expect(p.start).toEqual(0);
  });

  xit('should return pageSize of items per page', (done) => {
    p.pageCount.then((count) => {
      expect(count).toEqual(p.testPageCount);
      done();
    });
  });


});
