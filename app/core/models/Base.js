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
    var promise;
    var idNameIsArray = typeof this.idName === 'object' && this.idName.length === 2;
    var idIsArray = typeof id === 'object' && id.length === 2;

    if(idNameIsArray && idIsArray) {
      promise = this.DataBaseObject
                  .query()
                  .where(this.idName[0], '=', id[0])
                  .orWhere(this.idName[1], '=', id[0]);
    } else if(idNameIsArray) {
      promise = this.DataBaseObject
                  .query()
                  .where(this.idName[0], '=', id)
                  .orWhere(this.idName[1], '=', id);
    } else if(idIsArray) {
      promise = this.DataBaseObject
                  .query()
                  .where(this.idName, '=', id[0])
                  .orWhere(this.idName, '=', id[0]);
    } else {
      promise  = this.DataBaseObject.query().where(this.idName, '=', id);
    }


    promise
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
