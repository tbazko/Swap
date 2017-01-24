'use strict';
const Counter = rootRequire('app/counter/Counter');

describe('Counter', () => {
  let c = new Counter();
  let fakeFunc = function(err, length) {return true};
  c.userId = 1;

  it('should be initialized', () => {
    expect(c).not.toBeUndefined();
  });

  it('should return new swap requests promise', () => {
    expect(c.getNewRequestsLength()).toEqual(jasmine.any(Promise));
  });

  it('should include new messages count in promise', (done) => {
    c.getNewRequestsLength().then((length) => {
      expect(length).toEqual(jasmine.any(Number));
      done();
    });
  });

});
