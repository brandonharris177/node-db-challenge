
exports.up = function(knex) {
    return knex.schema
    .createTable('projects', tbl => {
      tbl.increments();
      tbl.string('name', 255).notNullable();
      tbl.string('description', 400);
      tbl.boolean('completed').notNullable().defaultTo(false)
    })

    .createTable('resources', tbl => {
      tbl.increments();
      tbl.string('name', 128).notNullable().unique();
      tbl.string('description', 400);
    })

    .createTable('tasks', tbl => {
        tbl.increments();
        tbl.string('description', 400).notNullable();
        tbl.string('notes', 400);
        tbl.boolean('completed').notNullable().defaultTo(false);

        tbl
        .integer('project_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('projects')
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');
    })

    .createTable('project_resources', tbl => {
      tbl.increments();

      tbl
      .integer('project_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('projects')
      .onUpdate('CASCADE')
      .onDelete('RESTRICT');

    tbl
      .integer('resource_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('resources')
      .onUpdate('CASCADE')
      .onDelete('RESTRICT');
    })
};

exports.down = function(knex) {
    return knex.schema
  .dropTableIfExists('projects')
    .dropTableIfExists('resources')
    .dropTableIfExists('tasks')
    .dropTableIfExists('project_resources');
};
