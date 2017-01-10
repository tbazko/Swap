'use strict';
const AccountModel = rootRequire('app/account/AccountModel');

describe('Account Model', () => {
  let accountModel = new AccountModel();
  let fakeRequest = {
    method: 'GET',
    user: {},
    isAuthenticated: function() {
      return this.user ? true : false;
    }
  }

  it('should be initialised', () => {
    expect(accountModel).not.toBeUndefined();
  });

  it('given data (request)', () => {
    expect(accountModel.method).toBeUndefined();
    expect(accountModel.user).toBeUndefined();
    expect(accountModel.userIsLoggedIn).toBe(false);
    accountModel.data = fakeRequest;
    expect(accountModel.method).toEqual('GET');
    expect(accountModel.user).toEqual(jasmine.any(Object));
    expect(accountModel.userIsLoggedIn).toBe(true);
  });

});
