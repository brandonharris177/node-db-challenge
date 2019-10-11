const db = require('../data/db.config');

module.exports = {
    find,
    findResources,
    addProject,
    addResources,
    addTask,
    findTasks
}

function find() {
    return db('projects');
}

function findResources(id) {
    return db('resources')
}

function findProjectById(id) {
    return db('projects')
    .where({id})
    .first();
}

function findResourceById(id) {
    return db('resources')
    .where({id})
    .first();
}

function findTaskById(id) {
    return db('tasks')
    .where({id})
    .first();
}

function findTasks() {
    return db('tasks as t')
    .join('projects as p', 'p.id', '=', 't.project_id')
    .select('p.name', 'p.description', 't.id', 't.description', 't.completed')
}

function addProject(newProject) {
    return db('projects')
      .insert(newProject, 'id')
      .then(([id]) => {
        return findProjectById(id);
      });
}

function addResources(newResource) {
    return db('resources')
      .insert(newResource, 'id')
      .then(([id]) => {
        return findResourceById(id);
      });
}

function addTask(newTask) {
    return db('tasks')
      .insert(newTask, 'id')
      .then(([id]) => {
        return findTaskById(id);
      });
}
