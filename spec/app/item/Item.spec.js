'use strict';
const ItemMock = rootRequire('spec/helpers/ItemMock');
const Item = rootRequire('app/item/Item');

describe('Item model', function() {
  describe('fullInfo promise', () => {
    let itemOwnerUserId = 1;

    let i = new Item({
      itemId: null,
      currentUserId: itemOwnerUserId,
    });

    it('should return promise', () => {
      i.itemId = global.itemId;
      expect(i.fullInfo).toEqual(jasmine.any(Promise));
    });

    it('should exist', (done) => {
      i.fullInfo.then(function(fullInfo) {
        expect(fullInfo.item).toEqual(jasmine.any(Object));
        done();
      }).catch((err) => console.log(err ));
    });

    it('should have same id as provided from client', (done) => {
      i.fullInfo.then(function(fullInfo) {
        expect(fullInfo.item.id).toEqual(global.itemId);
        done();
      }).catch((err) => console.log(err ));
    });

    it('should load all relations', (done) => {
      i.fullInfo.then(function(fullInfo) {
        expect(fullInfo.item.images).toEqual(jasmine.any(Array));
        expect(fullInfo.item.tags).toEqual(jasmine.any(Array));
        expect(fullInfo.item.swapForTags).toEqual(jasmine.any(Array));
        done();
      }).catch((err) => console.log(err ));
    });

    it('should belong to current user', function(done) {
      i.fullInfo.then(function(fullInfo) {
        expect(fullInfo.itemBelongsToCurrentUser).toBeTruthy();
        done();
      }).catch((err) => console.log(err ));
    });

    it('should NOT belong to current user', function(done) {
      i.currentUserId = 0;
      i.fullInfo.then(function(fullInfo) {
        expect(fullInfo.itemBelongsToCurrentUser).toBeFalsy();
        done();
      }).catch((err) => console.log(err ));
    });

    it('if item doesn\'t exist, should resolve with {item: null}', function(done) {
      i.itemId = -1;
      i.fullInfo.then(function(fullInfo) {
        expect(fullInfo).toEqual({item: null});
        done();
      });
    });
  });

  describe('coreInfo promise', () => {
    let itemOwnerUserId = 1;

    let i = new Item({
      itemId: null,
      currentUserId: itemOwnerUserId,
    });

    it('should return promise', () => {
      i.itemId = global.itemId;
      expect(i.coreInfo).toEqual(jasmine.any(Promise));
    });

    it('should exist', (done) => {
      i.coreInfo.then(function(coreInfo) {
        expect(coreInfo).toEqual(jasmine.any(Object));
        done();
      }).catch((err) => console.log(err ));
    });

    it('should have same id as provided from client', (done) => {
      i.coreInfo.then(function(coreInfo) {
        expect(coreInfo.id).toEqual(i.itemId);
        done();
      }).catch((err) => console.log(err ));
    });

    it('if item doesn\'t exist, should resolve with {item: null}', function(done) {
      i.itemId = -1;
      i.coreInfo.then(function(coreInfo) {
        expect(coreInfo).toEqual(null);
        done();
      });
    });
  })
});
