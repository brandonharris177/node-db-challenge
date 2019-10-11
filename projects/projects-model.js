const db = require('../data/db.config');

module.exports = {
    find,
    findResources,
    addProject
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

function addProject(newProject) {
    return db('projects')
      .insert(newProject, 'id')
      .then(([id]) => {
        return findProjectById(id);
      });
}

// function findResources(id) {
//     return db('recipe_ingredients as ri')
//     .join('ingredients as i', 'i.id', '=', 'ri.ingredient_id')
//     .where({ recipe_id: id })
//     .select('i.name', 'ri.measurement_type', 'ri.ammount')
// }

// function findInstructions(id) {
//     return db('instructions as i')
//     .join('recipes as r', 'r.id', '=', 'i.recipe_id')
//     .where({ recipe_id: id })
//     .select('i.step_number', 'i.description')
// }