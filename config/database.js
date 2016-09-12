"use strict";
var mysql = require('mysql');
var objection = require('objection');
var Model = objection.Model;
var Knex = require('knex');
var knex = Knex({
  client: 'mysql',
  connection: {
    host     : '127.0.0.1',
    user     : 'root',
    password : '',
    database : 'Swap',
    charset  : 'utf8'
  }
});

Model.knex(knex);

module.exports.knex = knex;
module.exports.Model = Model;
