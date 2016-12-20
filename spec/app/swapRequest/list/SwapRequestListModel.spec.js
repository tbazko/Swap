'use strict';
const SwapRequestListModel = rootRequire('app/swapRequest/list/SwapRequestListModel');

describe('Swap Request List Model', () => {
  let srlm = new SwapRequestListModel();
  let fakeReq = {
    user: {
      id: -1
    }
  }

  let fakeReqWithRealUser = {
    user: {
      id: 1
    }
  }
  srlm.data = fakeReq;

  it('should initialise', () => {
    expect(srlm).not.toBeUndefined();
  });

  it('user should be an user object', () => {
    expect(srlm.user).toBe(fakeReq.user);
  });

  it('userId should be a Number', () => {
    expect(srlm.userId).toBe(fakeReq.user.id);
  });

  it('given current user id, should return Promise', () => {
    expect(srlm.requests).toEqual(jasmine.any(Promise));
  });

  it('given user doesn\'t exist when resolved Promise should contain empty array', (done) => {
    srlm.requests.then((response) => {
      expect(response).toEqual([]);
      done();
    });
  });

  it('given user exist and has requests when resolved Promise should contain array of requests', (done) => {
    srlm.data = fakeReqWithRealUser;

    srlm.requests.then((response) => {
      expect(response).toEqual(jasmine.any(Array));
      expect(response[0]).toEqual(jasmine.any(Object));
      expect(response[0].id).toEqual(jasmine.any(Number));
      expect(response[0].buyer_id).toEqual(jasmine.any(Number));
      expect(response[0].seller_id).toEqual(jasmine.any(Number));
      done();
    });
  });
});
