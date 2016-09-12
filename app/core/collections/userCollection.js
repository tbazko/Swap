// "use strict";
// let User = require('./userModel');
// let DB = require('../../config/database').DB;
//
// let Users = DB.Collection.extend({
//   model: User
// });
//
// var get = function(callback) {
//   Users.forge()
//   .fetch().then(function(users) {
//     callback(false, users);
//   })
//   .catch(function (err) {
//     callback(true, err);
//   });
// }
//
// var convertToJson = function(callback) {
//   get(function(error, response) {
//     var json = response.toJSON();
//     callback(error, json);
//   });
// }
//
// module.exports.get = get;
// module.exports.convertToJson = convertToJson;
