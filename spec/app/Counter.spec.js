'use strict';
const Counter = rootRequire('app/Counter');

describe('Counter', () => {
  let c = new Counter({currentUserId: 1});
  let fakeFunc = function(err, length) {return true};

  it('should be initialized', () => {
    expect(c).not.toBeUndefined();
  });

  it('should return new swap requests promise', () => {
    expect(c.getNewRequestsLength()).toEqual(jasmine.any(Promise));
  });

  it('should include new messages count in promise', (done) => {
    c.getNewRequestsLength().then((length) => {
      expect(length).toEqual(jasmine.objectContaining({count: jasmine.any(Number)}));
      done();
    });
  });

});
