'use strict';
const SwapRequestStatusChanger = rootRequire('app/swapRequest/SwapRequestStatusChanger');

describe('SwapRequestStatusChanger', () => {
  let srs;
  let newSwapRequest = {
    status: 'new',
    masterItems: [{id: 1, status: 'for_sale'}],
    slaveItems: [{id: 2, status: 'for_sale'}]
  }

  let pendingSwapRequest = {
    status: 'pending',
    masterItems: [{id: 1, status: 'for_sale'}],
    slaveItems: [{id: 2, status: 'for_sale'}]
  }

  beforeEach(() => {
    SocketAPImock._events.statusChanged = [];
    srs = new SwapRequestStatusChanger();
    srs._socket = SocketAPImock;
  });

  it('should initialise', function() {
    expect(srs).not.toBeUndefined();
  });

  describe('Swap Request statusChanged', () => {
    let eventHandlerSpy;

    beforeEach(() => {
      eventHandlerSpy = jasmine.createSpy('changeSpy');
      srs._socket.on('statusChanged', eventHandlerSpy);
      ClientSocketMock.emit('statusChanged', 'accept');
    });

    it('should catch statusChanged event with params', () => {
      expect(eventHandlerSpy).toHaveBeenCalledTimes(1);
      expect(eventHandlerSpy).toHaveBeenCalledWith('accept');
    });
  });

  it('should return null if swapRequest is not set', () => {
    expect(srs.swapRequest).toBe(null);
  });

  it('should return null if status is not set', () => {
    expect(srs._currentStatus).toBe(null);
  });

  it('should return updated status', () => {
    srs.swapRequest = pendingSwapRequest;
    srs._changeTo('accept');
    expect(srs._currentStatus).toBe('accept');
  });

  it('should keep previous status if status is empty', () => {
    srs.swapRequest = pendingSwapRequest;
    srs._changeTo('declined');
    srs._changeTo();
    expect(srs._currentStatus).toBe('declined');
  });

  it('should get status from request', () => {
    srs.swapRequest = pendingSwapRequest;
    expect(srs.update()).toBe('pending');
  });

  it('should get status from request', () => {
    srs.swapRequest = pendingSwapRequest;
    expect(srs.update()).toBe('pending');
  });

  it('should change _currentStatus to pending, if swapRequest is opened', () => {
    srs.swapRequest = newSwapRequest;
    expect(srs.update()).toBe('pending');
  });

  it('should update request status in DB, if status changed', () => {
    spyOn(srs, '_updateStatusInDB').and.callFake(() => {return true});

    srs.swapRequest = newSwapRequest;
    srs.update();
    expect(srs._updateStatusInDB).toHaveBeenCalledTimes(1);
    srs._changeTo('accepted');
    expect(srs._updateStatusInDB).toHaveBeenCalledTimes(2);
    srs._changeTo('declined');
    expect(srs._updateStatusInDB).toHaveBeenCalledTimes(3);
  });

  it('should patch status column with correct value', () => {
    spyOn(srs._swapRequestDBmodel, 'patch').and.callFake(() => {return true});

    srs.swapRequest = newSwapRequest;
    srs.update();
    expect(srs._swapRequestDBmodel.patch).toHaveBeenCalledTimes(1);
    expect(srs._swapRequestDBmodel.patch).toHaveBeenCalledWith('status', 'pending');
    srs._changeTo('accepted');
    expect(srs._swapRequestDBmodel.patch).toHaveBeenCalledTimes(2);
    expect(srs._swapRequestDBmodel.patch).toHaveBeenCalledWith('status', 'accepted');
    srs._changeTo('declined');
    expect(srs._swapRequestDBmodel.patch).toHaveBeenCalledTimes(3);
    expect(srs._swapRequestDBmodel.patch).toHaveBeenCalledWith('status', 'declined');
  });

  it('shouldn\'t update DB if status is null', () => {
    spyOn(srs, '_updateStatusInDB').and.callFake(() => {return true});
    srs.swapRequest = pendingSwapRequest;
    srs._changeTo(null);
    expect(srs._updateStatusInDB).toHaveBeenCalledTimes(0);
    srs._changeTo('accepted');
    srs._changeTo(null);
    expect(srs._updateStatusInDB).toHaveBeenCalledTimes(1);
  });

  it('shouldn\'t update DB if status is undefined', () => {
    spyOn(srs, '_updateStatusInDB').and.callFake(() => {return true});
    srs.swapRequest = pendingSwapRequest;
    srs._changeTo(undefined);
    expect(srs._updateStatusInDB).toHaveBeenCalledTimes(0);
    srs._changeTo('accepted');
    srs._changeTo(undefined);
    expect(srs._updateStatusInDB).toHaveBeenCalledTimes(1);
  });

  it('should change items related to swapRequest status, if accepted', () => {
    srs.swapRequest = pendingSwapRequest;
    spyOn(srs, '_updateItemsStatusInDB').and.callFake(() => {return true});
    srs._changeTo('accepted');
    expect(srs._updateItemsStatusInDB).toHaveBeenCalledTimes(1);
  });
});
