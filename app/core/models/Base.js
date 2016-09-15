"use strict";

class Base {
  constructor(DataBaseObject) {
    this.DataBaseObject = DataBaseObject;
    this.idName = 'id';
  }

  get identifier() {
    return this.idName;
  }

  set identifier(str) {
    this.idName = str;
  }

  getWithRelations(id, relations, callback) {
    this.DataBaseObject
      .query()
      .where(this.idName, '=', id)
      .eager(relations)
      .then(function(items) {
        callback(null, items);
      })
      .catch(function(err) {
        callback(true, err);
      });
  }

  getOneByIdentifier(id, callback) {
    this.DataBaseObject
      .query()
      .where(this.identifier, '=', id)
      .first()
      .then(function(item) {
        callback(null, item);
      })
      .catch(function(err) {
        callback(true, err);
      });
  }

  getAllByIdentifier(id, callback) {
    this.DataBaseObject
      .query()
      .where(this.identifier, '=', id)
      .then(function(items) {
        callback(null, items);
      })
      .catch(function(err) {
        callback(true, err);
      });
  }

  getAll(callback) {
    this.DataBaseObject
      .query()
      .then(function(items) {
        callback(null, items);
      })
      .catch(function (err) {
        callback(true, err);
      });
  }

  convertToJson() {
    getAll(function(error, response) {
      let json = response.toJSON();
      callback(error, json);
    });
  }
}

module.exports = Base
