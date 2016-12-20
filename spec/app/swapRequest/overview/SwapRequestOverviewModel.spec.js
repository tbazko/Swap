'use strict';
const SwapRequestOverviewModel = rootRequire('app/swapRequest/overview/SwapRequestOverviewModel');
const SwapRequest = rootRequire('app/core/dataBaseModels/SwapRequest');

describe('Swap Request Overview Model', () => {
  let srom = new SwapRequestOverviewModel();
  let fakeReq = {
    user: {
      id: -1
    },
    params: {
      id: -1
    },
    baseUrl: '/',
    path: 'path/to/smth'
  }

  let fakeReqWithRealRequest = {
    user: {
      id: 1
    },
    params: {
      id: 1
    },
    baseUrl: '/',
    path: 'path/to/smth'
  }

  srom.data = fakeReq;

  it('should initialise', () => {
    expect(srom).not.toBeUndefined();
  });

  it('user should be an user object', () => {
    expect(srom.user).toBe(fakeReq.user);
  });

  it('requestId should be an url params id', () => {
    expect(srom.requestId).toBe(fakeReq.params.id);
  });

  it('url should be full url', () => {
    expect(srom.url).toBe(fakeReq.baseUrl + fakeReq.path);
  });

  it('if asked for request object, should return Promise', () => {
    expect(srom.request).toEqual(jasmine.any(Promise));
  });

  it('given user doesn\'t exist when resolved Promise should contain empty array', (done) => {
    srom.request.then((response) => {
      expect(response).toEqual({request: undefined, user: { id: -1 }, url: '/path/to/smth' });
      done();
    });
  });

  it('given user and request exist', (done) => {
    srom.data = fakeReqWithRealRequest;

    srom.request.then((response) => {
      expect(response.request).toEqual(jasmine.any(Object));
      expect(response.request.id).toEqual(jasmine.any(Number));
      expect(response.request.buyer_id).toEqual(jasmine.any(Number));
      expect(response.request.seller_id).toEqual(jasmine.any(Number));
      expect(response.request.seller).toEqual(jasmine.any(Object));
      done();
    });
  });
});
