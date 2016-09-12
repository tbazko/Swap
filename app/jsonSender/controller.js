"use strict";

exports.sendCollectionAsJson = function(collection, req, res, next) {
  collection.convertToJson(function(error, json) {
    if(error) {
      res.status(500).json({error: true, data: {message: error.message}});
    }
    res.setHeader('Content-Type', 'application/json');
    res.send(json);
  });
}
