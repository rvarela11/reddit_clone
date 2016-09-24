exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists("users", function(table) {
    table.increments().primary();
    table.string("full_name");
    table.string("user_name");
    table.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
