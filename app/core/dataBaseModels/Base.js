"use strict";

class Base {
  constructor(DataBaseSchema) {
    this.DataBaseSchema = DataBaseSchema;
    this.idName = 'id';
    this.id = null;
  }

  getWithRelations(id, relations, callback) {
    var promise;
    var idNameIsArray = typeof this.idName === 'object' && this.idName.length === 2;
    var idIsArray = typeof id === 'object' && id.length === 2;

    if(idNameIsArray && idIsArray) {
      promise = this.DataBaseSchema
                  .query()
                  .where(this.idName[0], '=', id[0])
                  .orWhere(this.idName[1], '=', id[0]);
    } else if(idNameIsArray) {
      promise = this.DataBaseSchema
                  .query()
                  .where(this.idName[0], '=', id)
                  .orWhere(this.idName[1], '=', id);
    } else if(idIsArray) {
      promise = this.DataBaseSchema
                  .query()
                  .where(this.idName, '=', id[0])
                  .orWhere(this.idName, '=', id[0]);
    } else {
      promise  = this.DataBaseSchema.query().where(this.idName, '=', id);
    }

    if(this.orderBy) {
      if(!this.orderDirection) this.orderDirection = "DESC";
      promise = promise.orderBy(this.orderBy, this.orderDirection);
    }

    promise
      .eager(relations)
      .then(function(items) {
        callback(null, items);
      })
      .catch(function(err) {
        callback(err);
      });
  }

  getOneByIdentifier(id, callback) {
    this.DataBaseSchema
      .query()
      .where(this.idName, '=', id)
      .first()
      .then(function(items) {
        callback(null, items);
      })
      .catch(function(err) {
        callback(true, err);
      });
  }

  getAllByIdentifier(id, callback) {
    this.DataBaseSchema
      .query()
      .where(this.idName, '=', id)
      .then(function(items) {
        callback(null, items);
      })
      .catch(function(err) {
        callback(true, err);
      });
  }

  convertToJson() {
    getAll(function(error, response) {
      let json = response.toJSON();
      callback(error, json);
    });
  }

  patch(column, value) {
    var columnUpdates = {};
    columnUpdates[column] = value;
    this.DataBaseSchema
      .query()
      .patch(columnUpdates)
      .where(this.idName, this.id)
      .then();
  }
}

module.exports = Base
