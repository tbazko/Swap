// 'use strict';
// const SwapRequestListPresenter = rootRequire('app/swapRequest/list/SwapRequestListPresenter');
//
// xdescribe('Swap Request List Presenter', function() {
//   let srlp = new SwapRequestListPresenter();
//   let fakeReq = {
//     user: {
//       id: -1
//     }
//   }
//
//   it('should initialise', function() {
//     expect(srlp).not.toBeUndefined();
//   });
//
//   it('should have model', function() {
//     expect(srlp.model).not.toBeUndefined();
//   });
//
//   it('should return correct template', function() {
//     expect(srlp.template).toEqual('swapRequestListView');
//   });
//
//   it('should render view', function() {
//     spyOn(srlp, '_renderView');
//     srlp.handle(fakeReq, {}, {});
//     expect(srlp._renderView).toHaveBeenCalledTimes(1);
//   });
// });
