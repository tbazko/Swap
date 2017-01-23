'use strict';
const UserProfilePresenter = rootRequire('app/userProfile/public/UserProfilePresenter');
let requestMock = rootRequire('spec/helpers/requestMock');

describe('UserProfilePresenter', () => {
  let upp = new UserProfilePresenter;
  let fakeResponse = {};
  let fakeNext = () => {return true};

  it('should initialise', () => {
    expect(upp).not.toBeUndefined();
  });

  it('should render template', () => {
    spyOn(upp, '_renderView').and.callFake(() => {return true});
    upp.handle(requestMock.correct, fakeResponse, fakeNext);
    upp.handle(requestMock.wrong, fakeResponse, fakeNext);
    expect(upp._renderView).toHaveBeenCalledTimes(2);
  });
});
