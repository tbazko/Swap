// 'use strict';
// const ItemFormPresenter = rootRequire('app/itemForm/ItemFormPresenter');
//
// xdescribe('Item Form Presenter', function() {
//   let ifp = new ItemFormPresenter();
//
//   it('should initialise', function() {
//     expect(ifp).not.toBeUndefined();
//   });
//
//   it('should have model', function() {
//     expect(ifp.model).not.toBeUndefined();
//   });
//
//   it('if GET request should render form', function() {
//     spyOn(ifp, '_renderForm');
//     ifp.model.method = 'GET';
//     expect(ifp._renderForm).toHaveBeenCalledTimes(1);
//   });
//
//   it('if POST request should parse form', function() {
//     spyOn(ifp, '_parseForm');
//     ifp.model.method = 'POST';
//     expect(ifp._parseForm).toHaveBeenCalledTimes(1);
//   });
//
//   describe('Listening to events', () => {
//     beforeAll((done) => {
//       spyOn(ifp, 'onMethodChanged').and.callFake(() => {return true});
//       spyOn(ifp, 'onFormError').and.callFake(() => {return true});
//       spyOn(ifp, 'onFormSaved').and.callFake(() => {return true});
//       ifp.model.eventEmitter.emit('methodChanged');
//       ifp.model.eventEmitter.emit('formError');
//       ifp.model.eventEmitter.emit('formSaved');
//       done();
//     });
//
//     it('on event emitted, mediator should call appropriate subscriber function', () => {
//       expect(ifp.onMethodChanged).toHaveBeenCalledTimes(1);
//       expect(ifp.onFormError).toHaveBeenCalledTimes(1);
//       expect(ifp.onFormSaved).toHaveBeenCalledTimes(1);
//     });
//   });
// });
