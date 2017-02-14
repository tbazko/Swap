'use strict';
const Search = rootRequire('app/Search');
const Item = rootRequire('app/core/dataBaseModels/Item');

describe('Search', () => {
  let s = new Search();
  let fakeFunc = function(err, length) {return true};
  this.item = new Item();

  afterAll((done) => {
    this.item.destroy(this.itemId).then((response) => {
      done();
    });
  });

  beforeAll((done) => {
    this.item.create({name: 'Testy test', description: 'test', itemCondition: '1', userId: '1'}, {upload: {size: 0}}).then((item) => {
      this.itemId = item.id;
      done();
    });
  });

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

  it('should find match in item\'s title or description and return array of items', (done) => {
    s.str = 'Test';
    s.resultsPromise().then((items) => {
      expect(items).toContain(jasmine.objectContaining({id: this.itemId}));
      done();
    });
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
