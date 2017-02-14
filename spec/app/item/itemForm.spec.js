'use strict';
const ItemMock = rootRequire('spec/helpers/ItemMock');
const ItemForm = rootRequire('app/item/ItemForm');
const ItemDataBaseModel = rootRequire('app/core/dataBaseModels/Item');
const events = require('events');
let eventEmitter = new events.EventEmitter();

describe('Item Form model', () => {
  let itemOwnerUserId = 1;
  let fakeFunc = function() {return true};

  let ifm = new ItemForm({
    itemId: null,
    currentUserId: itemOwnerUserId,
    eventEmitter: eventEmitter
  });

  it('should initialise', function() {
    ifm.itemId = global.itemId;
    expect(ifm).not.toBeUndefined();
  });

  it('if item doesn\'t exist, create', () => {
    spyOn(ifm, '_createItem').and.callFake(fakeFunc);
    ifm._handleItem(null);
    expect(ifm._createItem).toHaveBeenCalledTimes(1);
  });

  it('if user is not logged, error', () => {
    ifm.currentUserId = undefined;
    spyOn(ifm, '_createItem').and.callFake(fakeFunc);
    ifm._handleItem(null);
    expect(ifm.error).toEqual(jasmine.any(String));
    expect(ifm._createItem).toHaveBeenCalledTimes(0);
  });

  it('if item exists and current user is item\'s owner, update', (done) => {
    ifm.currentUserId = itemOwnerUserId;
    spyOn(ifm, '_updateItem').and.callFake(fakeFunc);
    ifm.coreInfo.then((item) => {
      ifm._handleItem(item);
      expect(ifm._updateItem).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('if item exists and current user is NOT item\'s owner, error', (done) => {
    ifm.currentUserId = -1;
    spyOn(ifm, '_updateItem').and.callFake(fakeFunc);
    ifm.coreInfo.then((item) => {
      ifm._handleItem(item);
      expect(ifm._updateItem).toHaveBeenCalledTimes(0);
      expect(ifm.error).toEqual(jasmine.any(String));
      done();
    });
  });
});
