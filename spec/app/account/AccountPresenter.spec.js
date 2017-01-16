'use strict';
const AccountPresenter = rootRequire('app/account/AccountPresenter');

describe('Account Presenter', () => {
  let account = new AccountPresenter('signInFormView');
  let fakeRequest = {
    method: 'GET',
    user: {},
    isAuthenticated: function() {
      return this.user ? true : false;
    }
  }
  function next() {};

  it('should be initialised', () => {
    expect(account).not.toBeUndefined();
  });

  it('given model\'s method is GET', () => {
    spyOn(account, '_renderView');
    account.signIn(fakeRequest, {}, next);
    expect(account._renderView).toHaveBeenCalledTimes(1);
  });

  it('given model\'s method is GET', () => {
    spyOn(account, '_renderView');
    account.signIn(fakeRequest, {}, next);
    expect(account._renderView).toHaveBeenCalledTimes(1);
  });

  it('given model\'s method is POST', () => {
    spyOn(account, '_renderView');
    fakeRequest.method = 'POST';

    account.signIn(fakeRequest, {}, next);
    expect(account._renderView).toHaveBeenCalledTimes(0);
  });


});
