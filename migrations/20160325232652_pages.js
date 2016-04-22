
exports.up = function(knex, Promise) {
  return knex.schema
  .createTableIfNotExists('Users', function(table) {
    table.increments('userId').unsigned().notNullable().primary();
    table.string('firstName');
    table.string('lastName');
    table.string('address');
    table.string('city');
    table.string('country');
    table.string('email').unique();
    table.string('password');
    table.string('phone');
    table.timestamp('reg_date');
  })
  .createTableIfNotExists('Products', function(table) {
    table.increments('productId').unsigned().notNullable().primary();
    table.string('name').notNullable();
    table.integer('userId').unsigned().notNullable().references('users.userId');
    table.string('state');
    table.string('description').defaultTo('');
    table.string('condition').notNullable();
    table.string('thumbnail');
    table.timestamp('reg_date');
  })
  .createTableIfNotExists('ProductImages', function(table) {
    table.string('imageId').primary();
    table.integer('productId').unsigned().notNullable().references('products.productId');
  })
  .createTableIfNotExists('Tags', function(table) {
    table.increments('tagId').notNullable().unsigned().primary();
    table.string('name').unique();
  })
  .createTableIfNotExists('Products_Tags', function(table) {
    table.integer('productId').unsigned().notNullable().references('products.productId');
    table.integer('tagId').unsigned().notNullable().references('tags.tagId');
  })
  .createTableIfNotExists('Products_SwapForTags', function(table) {
    table.integer('productId').unsigned().notNullable().references('products.productId');
    table.integer('tagId').unsigned().notNullable().references('tags.tagId');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema
  .dropTable('Products_SwapForTags')
  .dropTable('Products_Tags')
  .dropTable('Tags')
  .dropTable('ProductImages')
  .dropTable('Products')
  .dropTable('Users');
};
