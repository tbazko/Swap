'use strict';
const ItemFormModel = rootRequire('app/itemForm/ItemFormModel');
const Item = rootRequire('app/core/dataBaseModels/Item');

describe('Item Form Model', function() {
  let ifm = new ItemFormModel();
  let mockRequestWithParamsOfExistingItem = {
    method: 'GET',
    params: {
      id: 2
    }
  };

  let mockRequestWithParamsOfUnExistingItem = {
    method: 'GET',
    params: {
      id: -1
    }
  };

  let mockRequestWithEmptyParams = {
    method: 'GET'
  }

  ifm.modelData = mockRequestWithEmptyParams;

  it('should initialise', function() {
    expect(ifm).not.toBeUndefined();
  });

  it('should return undefined if there is no item id in request params', function() {
    expect(ifm.itemId).toBe(undefined);
  });

  it('should return undefined if Item doesn\'t exist', function(done) {
    ifm.modelData = mockRequestWithParamsOfUnExistingItem;
    ifm.item
      .then((response) => {
        expect(response).toBe(undefined);
        done();
      });
  });

  it('should return id if any provided', function() {
    expect(ifm.itemId).toBe(-1);
  });

  it('should return method if any provided', function() {
    expect(ifm.method).toBe('GET');
  });

  it('should return item', function(done) {
    ifm.modelData = mockRequestWithParamsOfExistingItem;
    ifm.item.then((response) => {
      expect(response).toEqual(jasmine.any(Object));
      done();
    });
  });

  it('should return item object Item exists', function(done) {
    ifm.item.then((response) => {
      expect(response).toEqual(jasmine.any(Object));
      done();
    });
  });

  it('should return item object with item id, if Item exists', function(done) {
    ifm.item.then((response) => {
      expect(response.id).toEqual(2);
      done();
    });
  });

  it('should return item object with item status, if Item exists', function(done) {
    ifm.item.then((response) => {
      expect(response.status).toEqual(jasmine.any(String));
      done();
    });
  });

  it('should return item object with user id, if Item exists', function(done) {
    ifm.item.then((response) => {
      expect(response.user_id).toEqual(jasmine.any(Number));
      done();
    });
  });

  describe('Emitting events', function() {
    beforeEach(function() {
      spyOn(ifm.eventEmitter, 'emit');
      ifm.method = 'POST';
    });

    it('when method is changed emit event once', function() {
      expect(ifm.eventEmitter.emit).toHaveBeenCalledTimes(1);
    });

    it('when method is changed emit event with name "methodChanged"', function() {
      expect(ifm.eventEmitter.emit).toHaveBeenCalledWith('methodChanged');
    });
  });
});
