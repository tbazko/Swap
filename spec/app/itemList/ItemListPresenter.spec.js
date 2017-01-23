'use strict';
const ItemListPresenter = rootRequire('app/itemList/ItemListPresenter');

describe('Item List Presenter', function() {
  let defaultPresenter = new ItemListPresenter(rootRequire('app/itemList/strategies/default'));
  let filteredByTag = new ItemListPresenter(rootRequire('app/itemList/strategies/filteredByTag'));
  let filteredByCurrentUser = new ItemListPresenter(rootRequire('app/itemList/strategies/filteredByCurrentUser'));

  it('should initialise', function() {
    expect(defaultPresenter).not.toBeUndefined();
  });

  it('should have model', function() {
    expect(defaultPresenter.model).not.toBeUndefined();
  });

  it('should return correct template for defaultPresenter strategy', function() {
    expect(defaultPresenter.template).toEqual('itemListView');
  });

  it('should return correct template for filteredByTag strategy', function() {
    expect(filteredByTag.template).toEqual('itemListView');
  });

  it('should return correct template for filteredByCurrentUser strategy', function() {
    expect(filteredByCurrentUser.template).toEqual('userItemListView');
  });

  describe('Render in view async operations', function() {
    beforeEach(function(done) {
      defaultPresenter.model.method = 'GET';
      done();
    });
    it('If method is GET, should render view', function(done) {
      spyOn(defaultPresenter, '_renderInView');
      defaultPresenter.model.items.then((response) => {
        expect(defaultPresenter._renderInView).toHaveBeenCalledTimes(1);
        done();
      });
    });
  });

  describe('Send to view async operations', function() {
    beforeEach(function(done) {
      defaultPresenter.model.method = 'POST';
      done();
    });
    it('If method is POST, should send data to view', function(done) {
      spyOn(defaultPresenter, '_sendToView');
      defaultPresenter.model.items.then((response) => {
        expect(defaultPresenter._sendToView).toHaveBeenCalledTimes(1);
        done();
      });
    });
  });
});
