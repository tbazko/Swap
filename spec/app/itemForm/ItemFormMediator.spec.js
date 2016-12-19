'use strict';
const events = require('events');
const eventEmitter = new events.EventEmitter();
// const ItemFormMediator = rootRequire('app/itemForm/ItemFormMediator');
const ItemFormPresenter = rootRequire('app/itemForm/ItemFormPresenter');

xdescribe('Item Form Mediator', () => {
  class MockPublisher {
    constructor() {
      this.eventEmitter = eventEmitter;
    }
  }

  let mockPublisher = new MockPublisher();
  let subscriber = new ItemFormPresenter();
  let ifm = new ItemFormMediator(mockPublisher, subscriber);

  it('should initialise', () => {
    expect(ifm).not.toBeUndefined();
  });

  it('when initialised should have publisher', () => {
    expect(ifm.publisher).not.toBeUndefined();
  });

  it('when initialised should have subscriber', () => {
    expect(ifm.subscriber).not.toBeUndefined();
  });

  it('when initialised should have eventEmitter', () => {
    expect(ifm.eventEmitter).not.toBeUndefined();
  });

  it('when initialised should aggregate publisher\'s eventEmitter', () => {
    expect(ifm.eventEmitter).toBe(ifm.publisher.eventEmitter);
  });

  describe('Listening to events', () => {
    beforeAll((done) => {
      ifm.listen();
      spyOn(subscriber, 'onMethodChanged').and.callFake(() => {return true});
      spyOn(subscriber, 'onFormError').and.callFake(() => {return true});
      spyOn(subscriber, 'onFormSaved').and.callFake(() => {return true});
      mockPublisher.eventEmitter.emit('methodChanged');
      mockPublisher.eventEmitter.emit('formError');
      mockPublisher.eventEmitter.emit('formSaved');
      done();
    });

    it('on event emitted, mediator should call appropriate subscriber function', () => {
      expect(subscriber.onMethodChanged).toHaveBeenCalledTimes(1);
      expect(subscriber.onFormError).toHaveBeenCalledTimes(1);
      expect(subscriber.onFormSaved).toHaveBeenCalledTimes(1);
    });
  });
})
