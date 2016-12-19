'use strict';
const ItemFormPresenter = rootRequire('app/itemForm/ItemFormPresenter');
// const ItemFormMediator = rootRequire('app/itemForm/ItemFormMediator');

describe('Item Form Presenter', function() {
  let ifp = new ItemFormPresenter();
  // let ifmediator = new ItemFormMediator(ifp.model, ifp);
  // ifmediator.listen();

  it('should initialise', function() {
    expect(ifp).not.toBeUndefined();
  });

  it('should have model', function() {
    expect(ifp.model).not.toBeUndefined();
  });

  it('if GET request should render form', function() {
    spyOn(ifp, '_renderForm');
    ifp.model.method = 'GET';
    expect(ifp._renderForm).toHaveBeenCalledTimes(1);
  });

  it('if POST request should parse form', function() {
    spyOn(ifp, '_parseForm');
    ifp.model.method = 'POST';
    expect(ifp._parseForm).toHaveBeenCalledTimes(1);
  });

  // describe('if POST request should parse form', function() {
  //   beforeEach(function(done) {
  //     ifp.model.method = 'POST';
  //     done();
  //   });
  //   it('If method is POST, should send data to view', function(done) {
  //     spyOn(defaultPresenter, '_sendToView');
  //     defaultPresenter.model.items.then((response) => {
  //       expect(defaultPresenter._sendToView).toHaveBeenCalledTimes(1);
  //       done();
  //     });
  //   });
  // });
});
