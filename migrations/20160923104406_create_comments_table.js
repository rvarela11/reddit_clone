exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists("comments", function(table) {
    table.increments().primary();
    table.text("content");
    table.bigInteger("post_id").unsigned().index().references('id').inTable(
      'posts').onDelete('cascade');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('comments');
};
