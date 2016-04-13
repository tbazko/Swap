var mysql = require('mysql');

var knex = require('knex')({
  client: 'mysql',
  connection: {
    host     : '127.0.0.1',
    user     : 'root',
    password : '',
    database : 'Swap',
    charset  : 'utf8'
  }
});

module.exports.knex = knex;
module.exports.DB = require('bookshelf')(knex);
