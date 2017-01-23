'use strict';
const SwapRequestOverviewModel = rootRequire('app/swapRequest/overview/SwapRequestOverviewModel');
const SwapRequest = rootRequire('app/core/dataBaseModels/SwapRequest');
const Chat = rootRequire('app/chat/Chat');

describe('SwapRequestOverviewModel', () => {
  let srom = new SwapRequestOverviewModel();

  beforeEach(() => {
    srom._chat = new Chat({
      chatId: srom._requestId,
      currentUser: srom._user,
      path: srom._path
    })
  });

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
      id: 2
    },
    baseUrl: '/',
    path: 'path/to/smth'
  }

  srom.data = fakeReq;

  it('should initialise', () => {
    expect(srom).not.toBeUndefined();
  });

  it('user should be an user object', () => {
    expect(srom._user).toBe(fakeReq.user);
  });

  it('requestId should be an url params id', () => {
    expect(srom._requestId).toBe(fakeReq.params.id);
  });

  it('url should be full url', () => {
    expect(srom._url).toBe(fakeReq.baseUrl + fakeReq.path);
  });

  it('should return Promise', () => {
    expect(srom.rawData).toEqual(jasmine.any(Promise));
  });

  it('given user and request don\'t exist', (done) => {
    srom.rawData.then((data) => {
      expect(data).toEqual([undefined, []]);
      done();
    }).catch((err) => {
      console.log(err);
    });
  });

  it('given user and request exist', (done) => {
    srom.data = fakeReqWithRealRequest;
    srom._status._socket = SocketAPImock;
    srom.rawData.then((data) => {
      expect(data[0]).toEqual(jasmine.any(Object));
      expect(data[0].id).toEqual(jasmine.any(Number));
      expect(data[0].buyer_id).toEqual(jasmine.any(Number));
      expect(data[0].seller_id).toEqual(jasmine.any(Number));
      expect(data[0].seller).toEqual(jasmine.any(Object));
      expect(data[1]).toEqual(jasmine.any(Array));
      done();
    });
  });
});
