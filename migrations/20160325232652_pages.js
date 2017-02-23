
exports.up = function(knex, Promise) {
  return knex.schema
  .createTableIfNotExists('users', function(table) {
    table.increments('id').unsigned().notNullable().primary();
    table.string('firstName');
    table.string('lastName');
    table.string('streetNumber');
    table.string('street');
    table.string('city');
    table.string('state');
    table.string('country');
    table.string('postcode');
    table.string('email').unique();
    table.string('password');
    table.string('phone');
    table.timestamp('reg_date');
    table.integer('unix_time');
    table.string('local_time');
  })
  .createTableIfNotExists('categories', function(table) {
    table.increments('id').notNullable().unsigned().primary();
    table.string('name').notNullable().unique();
    table.integer('parent').defaultTo(null);
  })
  .createTableIfNotExists('items', function(table) {
    table.increments('id').unsigned().notNullable().primary();
    table.string('name').notNullable();
    table.integer('user_id').unsigned().notNullable().references('users.id');
    table.integer('category_id').unsigned().references('categories.id');
    table.integer('subcategory_id').unsigned().references('categories.id');
    table.string('status');
    table.text('description', 'longtext');
    table.text('reasonForSwap', 'longtext');
    table.string('condition').notNullable();
    table.timestamp('reg_date');
    table.integer('unix_time');
    table.string('local_time');
  })
  .createTableIfNotExists('swapRequests', function(table) {
    table.increments('id').unsigned().notNullable().primary();
    table.integer('buyer_id').unsigned().notNullable().references('users.id');
    table.integer('seller_id').unsigned().notNullable().references('users.id');
    table.string('status').defaultTo('new').notNullable();
    table.text('message', 'longtext');
    table.timestamp('reg_date');
    table.integer('unix_time');
    table.string('local_time');
  })
  .createTableIfNotExists('itemImages', function(table) {
    table.string('id').primary();
    table.integer('item_id').unsigned().notNullable().references('items.id');
  })
  .createTableIfNotExists('tags', function(table) {
    table.increments('id').notNullable().unsigned().primary();
    table.string('name').unique();
  })
  .createTableIfNotExists('requestMessages', function(table) {
    table.increments('id').notNullable().unsigned().primary();
    table.boolean('new').defaultTo(true).notNullable();
    table.timestamp('reg_date');
    table.integer('unix_time');
    table.string('local_time');
    table.string('text');
    table.integer('user_id').unsigned().notNullable().references('users.id');
    table.integer('swapRequest_id').unsigned().notNullable().references('swaprequests.id');
  })
  .createTableIfNotExists('items_tags', function(table) {
    table.integer('item_id').unsigned().notNullable().references('items.id');
    table.integer('tag_id').unsigned().notNullable().references('tags.id');
  })
  .createTableIfNotExists('items_swapForTags', function(table) {
    table.integer('item_id').unsigned().notNullable().references('items.id');
    table.integer('tag_id').unsigned().notNullable().references('tags.id');
  })
  .createTableIfNotExists('masterItems_swapRequests', function(table) {
    table.integer('item_id').unsigned().notNullable().references('items.id');
    table.integer('request_id').unsigned().notNullable().references('swaprequests.id');
  })
  .createTableIfNotExists('slaveItems_swapRequests', function(table) {
    table.integer('item_id').unsigned().notNullable().references('items.id');
    table.integer('request_id').unsigned().notNullable().references('swaprequests.id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema
  .dropTable('masterItems_swapRequests')
  .dropTable('slaveItems_swapRequests')
  .dropTable('requestMessages')
  .dropTable('swapRequests')
  .dropTable('items_swapForTags')
  .dropTable('items_tags')
  .dropTable('tags')
  .dropTable('itemImages')
  .dropTable('items')
  .dropTable('categories')
  .dropTable('users');
};
