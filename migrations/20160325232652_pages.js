
exports.up = function(knex, Promise) {
  return knex.schema
  .createTableIfNotExists('users', function(table) {
    table.increments('id').unsigned().notNullable().primary();
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
  .createTableIfNotExists('products', function(table) {
    table.increments('id').unsigned().notNullable().primary();
    table.string('name').notNullable();
    table.integer('user_id').unsigned().notNullable().references('users.id');
    table.string('state');
    table.string('description').defaultTo('');
    table.string('condition').notNullable();
    table.string('thumbnail');
    table.timestamp('reg_date');
  })
  .createTableIfNotExists('swapRequests', function(table) {
    table.increments('id').unsigned().notNullable().primary();
    table.integer('buyer_id').unsigned().notNullable().references('users.id');
    table.integer('seller_id').unsigned().notNullable().references('users.id');
    table.string('email');
    table.string('phone');
    table.string('message');
  })
  .createTableIfNotExists('productImages', function(table) {
    table.string('id').primary();
    table.integer('product_id').unsigned().notNullable().references('products.id');
  })
  .createTableIfNotExists('tags', function(table) {
    table.increments('id').notNullable().unsigned().primary();
    table.string('name').unique();
  })
  .createTableIfNotExists('requestMessages', function(table) {
    table.increments('id').notNullable().unsigned().primary();
    table.timestamp('reg_date');
    table.string('text');
    table.integer('user_id').unsigned().notNullable().references('users.id');
    table.integer('swapRequest_id').unsigned().notNullable().references('swaprequests.id');
  })
  .createTableIfNotExists('products_tags', function(table) {
    table.integer('product_id').unsigned().notNullable().references('products.id');
    table.integer('tag_id').unsigned().notNullable().references('tags.id');
  })
  .createTableIfNotExists('products_swapForTags', function(table) {
    table.integer('product_id').unsigned().notNullable().references('products.id');
    table.integer('tag_id').unsigned().notNullable().references('tags.id');
  })
  .createTableIfNotExists('masterProducts_swapRequests', function(table) {
    table.integer('product_id').unsigned().notNullable().references('products.id');
    table.integer('request_id').unsigned().notNullable().references('swaprequests.id');
  })
  .createTableIfNotExists('slaveProducts_swapRequests', function(table) {
    table.integer('product_id').unsigned().notNullable().references('products.id');
    table.integer('request_id').unsigned().notNullable().references('swaprequests.id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema
  .dropTable('masterProducts_swapRequests')
  .dropTable('slaveProducts_swapRequests')
  .dropTable('requestMessages')
  .dropTable('swapRequests')
  .dropTable('products_swapForTags')
  .dropTable('products_tags')
  .dropTable('tags')
  .dropTable('productImages')
  .dropTable('products')
  .dropTable('users');
};
