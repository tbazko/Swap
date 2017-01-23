'use strict';
const UserProfileModel = rootRequire('app/userProfile/public/UserProfileModel');
let requestMock = rootRequire('spec/helpers/requestMock');

describe('UserProfileModel', () => {
  let upm = new UserProfileModel;

  it('should initialise', () => {
    expect(upm).not.toBeUndefined();
  });

  it('should return user data', () => {
    upm.data = {firstName: 'Name'};
    expect(upm.data.firstName).toEqual(jasmine.any(String));
  });

  it('should return undefined if user doesn\'t exist', (done) => {
    upm.userId = requestMock.wrong.params.id;
    upm.userPromise.then((user) => {
      expect(user).toBeUndefined();
      done();
    }).catch((err) => {
      console.log(err);
      done();
    });
  });

  it('should return user data structure', (done) => {
    upm.userId = requestMock.correct.params.id;
    upm.userPromise.then((user) => {
      expect(user.firstName).toEqual(jasmine.any(String));
      done();
    }).catch((err) => {
      console.log(err);
      done();
    });
  });

});
