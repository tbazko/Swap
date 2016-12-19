'use strict';
const ItemPresenter = rootRequire('app/item/ItemPresenter');

describe('Item Presenter', function() {
  let ip = new ItemPresenter();

  it('should initialise', function() {
    expect(ip).not.toBeUndefined();
  });

  it('should have template', function() {
    expect(ip.template).not.toBeUndefined();
  });

  it('should have model', function() {
    expect(ip.model).not.toBeUndefined();
  });
});
