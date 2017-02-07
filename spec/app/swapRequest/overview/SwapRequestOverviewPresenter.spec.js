// 'use strict';
// const SwapRequestOverviewPresenter = rootRequire('app/swapRequest/overview/SwapRequestOverviewPresenter');
// const Chat = rootRequire('app/chat/Chat');
//
// xdescribe('Swap Request Overview Presenter', function() {
//   let srop = new SwapRequestOverviewPresenter();
//   srop._socket = global.SocketAPImock;
//   let fakeReq = {
//     user: {
//       id: -1
//     },
//     params: {
//       id: -1
//     },
//     baseUrl: '/',
//     path: 'path/to/smth'
//   }
//
//   it('should initialise', function() {
//     expect(srop).not.toBeUndefined();
//   });
//
//   it('should have model', function() {
//     expect(srop.model).not.toBeUndefined();
//   });
//
//   it('should return correct', function() {
//     expect(srop.template).toEqual('swapRequestOverviewView');
//   });
//
//   it('should render view', function() {
//     spyOn(srop, '_renderView').and.callFake(() => {return true;});
//     spyOn(srop.model, 'createChat').and.callFake(() => {return true;});
//     srop.handle(fakeReq, {}, {});
//     expect(srop._renderView).toHaveBeenCalledTimes(1);
//   });
// });
