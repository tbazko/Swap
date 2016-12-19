'use strict';
const ItemModel = rootRequire('app/item/ItemModel');

describe('Item Presenter', function() {
  let im = new ItemModel();
  im.id = 2;

  it('should return promise', function() {
    expect(im.fullInfo).toEqual(jasmine.any(Promise));
  });

  it('after promise is resolvd, fullInfo should contain user', function(done) {
    im.fullInfo.then(function(fullInfo) {
      expect(fullInfo.user).toEqual(jasmine.any(Object));
      done();
    });
  });

});
