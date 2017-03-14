"use strict";
var mysql = require('mysql');
var objection = require('objection');
var Model = objection.Model;
var Knex = require('knex');
var knex = Knex({
  client: 'mysql',
  connection: {
    // host     : process.env.DBHOST,
    // user     : process.env.DBUSER,
    // password : process.env.DBPASS,
    // database : process.env.DBNAME,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Swap',
    // debug: ['ComQueryPacket'],
    charset  : 'utf8',
    timezone : 'UTC'
  }
});

Model.knex(knex);

module.exports.knex = knex;
module.exports.Model = Model;
