'use strict';
const DestroyButtonModel = rootRequire('app/destroyButton/DestroyButtonModel');

describe('Destroy Button Model', function() {
  let dbm = new DestroyButtonModel();
  let fakeModelData = {
    params: {
      id: -1
    },
    user: {
      id: -1
    }
  }

  it('should initialise', () => {
    expect(dbm).not.toBeUndefined();
  });

  it('should invoke destroy function', () => {
    spyOn(dbm, 'destroy').and.callFake(() => {
      return true;
    });
    dbm.destroy();
    expect(dbm.destroy).toHaveBeenCalledTimes(1);
  });

  it('expect userId to be set to -1', () => {
    dbm.data = fakeModelData;
    expect(dbm.userId).toBe(-1);
  });

  it('expect itemId to be set to -1', () => {
    expect(dbm.itemId).toBe(-1);
  });
});
