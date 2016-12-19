"use strict";
const Message = rootRequire('app/core/dataBaseObjects/Message');

var post = function(req, res, next) {
  let newMessage = new Message();
  newMessage.create(req, function(err) {
    if(err) {
      return console.log(err);
    }
  });
}

module.exports.post = post;
