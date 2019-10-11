const db = require('../data/db.config');

module.exports = {
    find,
    findResources,
    addProject,
    addResources,
    addTask,
    findTasks,
    remove,
    removeResource,
    removeTask,
    findProjectById,
    update,
    updateResource,
    updateTask,
    findTaskById
}

function find() {
    return db('projects')
}

function findResources() {
    return db('resources');
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

function remove(id) {
    return db('projects')
    .where({id})
    .del()
}

function removeResource(id) {
    return db('resources')
    .where({id})
    .del()
}

function removeTask(id) {
    return db('tasks')
    .where({id})
    .del()
}

function update(changes, id) {
    return db('projects')
    .where('id', `=`, id)
    .update(changes, 'id')
    .then(res => {
        if (res === 1) {
            return findProjectById(id)
        } else {
            res.status(500).json('server error')
        }
      });
}

function updateResource(changes, id) {
    return db('resources')
    .where('id', `=`, id)
    .update(changes, 'id')
    .then(res => {
        if (res === 1) {
            return findResourceById(id)
        } else {
            res.status(500).json('server error')
        }
      });
}

function updateTask(changes, id) {
    return db('tasks')
    .where('id', `=`, id)
    .update(changes, 'id')
    .then(res => {
        if (res === 1) {
            return findTaskById(id)
        } else {
            res.status(500).json('server error')
        }
      });
}