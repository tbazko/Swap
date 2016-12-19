'use strict';
const DestroyButtonPresenter = rootRequire('app/destroyButton/DestroyButtonPresenter');

describe('Destroy Button Presenter', function() {
  let dbp = new DestroyButtonPresenter();

  it('should initialise', function() {
    expect(dbp).not.toBeUndefined();
  });

  it('should have model', function() {
    expect(dbp.model).not.toBeUndefined();
  });
});
