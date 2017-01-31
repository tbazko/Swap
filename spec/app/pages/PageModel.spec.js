'use strict';
const PageModel= rootRequire('app/page/PageModel');

describe('Page Model', function() {
  let pm = new PageModel();

  it('should be initialised', function() {
    expect(pm).not.toBeUndefined();
  });
});
