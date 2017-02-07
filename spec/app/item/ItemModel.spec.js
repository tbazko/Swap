// 'use strict';
// const ItemModel = rootRequire('app/item/ItemModel');
//
// xdescribe('Item Model', function() {
//   let im = new ItemModel();
//   im.id = 1;
//
//   it('should return promise', function() {
//     expect(im.fullInfo).toEqual(jasmine.any(Promise));
//   });
//
//   it('if item exists, fullInfo should contain user', function(done) {
//     im.fullInfo.then(function(fullInfo) {
//       expect(fullInfo.user).toEqual(jasmine.any(Object));
//       done();
//     });
//   });
//
//   it('if item doesn\'t exist, should reject with null', function(done) {
//     im.id = -1;
//     im.fullInfo.then(function(fullInfo) {
//     }).catch((err) => {
//       expect(err).toEqual(null);
//       done();
//     });
//   });
// });
