'use strict';
const ItemListModel = rootRequire('app/itemList/ItemListModel');
const Item = rootRequire('app/core/dataBaseModels/Item');

describe('Item List Model', function() {
  let defaultModel = new ItemListModel(rootRequire('app/itemList/strategies/default'));
  let filteredByTag = new ItemListModel(rootRequire('app/itemList/strategies/filteredByTag'));
  let filteredByCurrentUser = new ItemListModel(rootRequire('app/itemList/strategies/filteredByCurrentUser'));

  let mockModelData = {
    method: 'GET',
    user: {
      id: 1,
      email: 'fake@email.com'
    },
    path: '/',
    params: {
      id: 'anime'
    }
  }

  defaultModel.data = mockModelData;
  filteredByTag.data = mockModelData;
  filteredByCurrentUser.data = mockModelData;

  it('should initialise', function() {
    expect(defaultModel).not.toBeUndefined();
    expect(filteredByTag).not.toBeUndefined();
    expect(filteredByCurrentUser).not.toBeUndefined();
  });

  it('should return params object', function() {
    expect(defaultModel.params).toEqual({id: 'anime'});
  });

  it('should return user object', function() {
    expect(defaultModel.user).toEqual({id: 1, email: 'fake@email.com'});
  });

  it('should return path', function() {
    expect(defaultModel.path).toEqual('/');
  });

  it('should return method', function() {
    expect(defaultModel.method).toEqual('GET');
  });

  it('given type of element, should return collection of them (default strategy)', function(done) {
    defaultModel.items.then(function(collection) {
      expect(collection).toEqual(jasmine.any(Object));
      done();
    });
  });

  it('given type of element, should return collection of them (filteredByTag strategy)', function(done) {
    filteredByTag.items.then(function(collection) {
      expect(collection).toEqual(jasmine.any(Object));
      done();
    });
  });

  it('given type of element, should return collection of them (filteredByCurrentUser strategy)', function(done) {
    filteredByCurrentUser.items.then(function(collection) {
      expect(collection).toEqual(jasmine.any(Object));
      done();
    });
  });

  it('if model changes should notify observers', function() {
    spyOn(defaultModel, 'notifyObservers');
    var fakeObserver = function() {};
    defaultModel.addObserver(fakeObserver);
    defaultModel.data = mockModelData;
    expect(defaultModel.notifyObservers).toHaveBeenCalledTimes(1);
  });

  it('if model changes observers should be called', function() {
    var fakeObserver = jasmine.createSpy('fakeObserver');
    defaultModel.addObserver(fakeObserver);
    defaultModel.data = mockModelData;
    expect(fakeObserver).toHaveBeenCalledTimes(1);
  });
});
