'use strict';
const ItemMock = rootRequire('spec/helpers/ItemMock');
const Search = rootRequire('app/Search');

describe('Search', () => {
  let s = new Search();
  let fakeFunc = function(err, length) {return true};

  it('should be initialized', () => {
    expect(s).not.toBeUndefined();
  });

  it('should find match and return an Array', (done) => {
    s.str = 'Test';
    s.resultsPromise().then((items) => {
      expect(items).toEqual(jasmine.any(Array));
      done();
    });
  });

  xit('should find match in item\'s title or description and return array of items', (done) => {
    s.str = 'Test';
    s.resultsPromise().then((items) => {
      let itemId;
      items.forEach((cluster) => {
        for(var key in cluster) {
          if (!cluster.hasOwnProperty(key)) continue;
          if(cluster[key].id === global.itemId) {
            itemId = cluster[key].id
          }
        }
      });
      expect(itemId).toEqual(global.itemId);
      expect(items).toEqual(jasmine.any(Array));
      done();
    }).catch((err) => console.log(err));
  });

  it('should find match in active items', (done) => {
    s.str = 'Test';
    s.resultsPromise().then((items) => {
      let itemId;
      items.forEach((cluster) => {
        for(var key in cluster) {
          if (!cluster.hasOwnProperty(key)) continue;
          if(cluster[key].status) {
            expect(cluster[key].status).toEqual('for_sale');
          }
        }
      });
      done();
    }).catch((err) => console.log(err));
  });

  describe('handling client data', () => {
    beforeAll(() => {
      spyOn(s, 'resultsPromise').and.callThrough();
      spyOn(s, '_sendResultsToClient').and.callThrough();
      s.search('Test', fakeFunc);
    });

    it('should call resultsPromise', () => {
      expect(s.resultsPromise).toHaveBeenCalledTimes(1);
    });

    it('should send results to client', () => {
      expect(s._sendResultsToClient).toHaveBeenCalledTimes(1);
    });

    it('should callback with results array', (done) => {
      spyOn(s, 'searchCallback');
      s.resultsPromise().then((results) => {
        expect(s.searchCallback).toHaveBeenCalledTimes(1);
        expect(s.searchCallback).toHaveBeenCalledWith(s.results);
        done();
      });
    });
  });

  describe('handling empty or invalid client data', () => {
    let invalidsearch;
    beforeEach(() => {
      invalidsearch = new Search();
      spyOn(invalidsearch, 'resultsPromise').and.returnValue(true);
      invalidsearch.search();
      invalidsearch.search('');
      invalidsearch.search(null);
      invalidsearch.search('*/<>');
    });

    it('shouldn\'t call resultsPromise if string is empty', () => {
      expect(invalidsearch.resultsPromise).toHaveBeenCalledTimes(0);
    });
  });
});
