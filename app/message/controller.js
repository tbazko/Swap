"use strict";
const Message = require('../core/models/Message');

var post = function(req, res, next) {
  let newMessage = new Message();
  newMessage.create(req, function(err) {
    if(err) {
      return console.log(err);
    }
  });
}

module.exports.post = post;
