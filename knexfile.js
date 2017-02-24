// Update with your config settings.
module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host     : process.env.DBHOST,
      user     : process.env.DBUSER,
      password : process.env.DBPASS,
      database : process.env.DBNAME,
      charset  : 'utf8'
    }
  },

  staging: {
    client: 'mysql',
    connection: {
      host     : process.env.DBHOST,
      user     : process.env.DBUSER,
      password : process.env.DBPASS,
      database : process.env.DBNAME,
      charset  : 'utf8'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'mysql',
    connection: {
      host     : process.env.DBHOST,
      user     : process.env.DBUSER,
      password : process.env.DBPASS,
      database : process.env.DBNAME,
      charset  : 'utf8'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
