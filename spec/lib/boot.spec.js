// const fs = require('fs');
// const request = require('request');
// const mainPage = rootRequire('app/controllers/main/index');
// const boot = rootRequire('app/lib/boot');
// const base_url = 'http://localhost:3000';
//
// describe('Booting', function() {
//   it('return folder names', function() {
//     expect(boot.getFolderNames()).toEqual(['item', 'main']);
//   });
//
//   it('return folders as objects', function() {
//     expect(boot.convertFoldersToObjects()).toEqual(jasmine.any(Array));
//   });
//
//   it('should return as many objects as there are folders', function() {
//     var foldersLength = boot.getFolderNames().length;
//     expect(boot.convertFoldersToObjects().length).toEqual(foldersLength);
//   });
//
//
//
//
//   describe('GET some path', function() {
//     it('/ returns status code 200', function(done) {
//       request.get(base_url, function(error, response, body) {
//         expect(response.statusCode).toBe(200);
//         done();
//       });
//     });
//
//     it('/items returns status code 200', function(done) {
//       request.get(base_url + '/items', function(error, response, body) {
//         expect(response.statusCode).toBe(200);
//         done();
//       });
//     });
//
//     it('/item/:id returns status code 200', function(done) {
//       request.get(base_url + '/item/2', function(error, response, body) {
//         expect(response.statusCode).toBe(200);
//         done();
//       });
//     });
//
//     // it('call index function', function(done) {
//     //   spyOn(mainPage, 'index');
//     //   request.get(base_url, function(error, response, body) {
//     //     expect(mainPage.index).toHaveBeenCalledTimes(1);
//     //     done();
//     //   });
//     // });
//   });
// });
