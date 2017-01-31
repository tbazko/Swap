'use strict';
const PagePresenter= rootRequire('app/page/PagePresenter');

describe('Page Presenter', function() {
  let pp = new PagePresenter({template: 'landing'});

  it('should be initialised', function() {
    expect(pp).not.toBeUndefined();
  });

});
