
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('users', function(table) {
    table.increments('UserId').unsigned().notNullable().primary();
    table.string('FirstName');
    table.string('LastName');
    table.string('Address');
    table.string('City');
    table.string('Country');
    table.string('Email').unique();
    table.string('Password');
    table.string('Phone');
    table.timestamp('Reg_date');
  }).createTable('products', function(table) {
    table.increments('ProductId').primary();
    table.string('Name').notNullable();
    table.integer('UserId').unsigned().notNullable().references('users.UserId');
    table.string('State');
    table.string('Image1');
    table.string('Image2');
    table.string('Image3');
    table.string('Image4');
    table.string('Description').defaultTo('');
    table.string('ProductCondition').notNullable();
    table.timestamp('Reg_date');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('products')
  .dropTable('users');
};
