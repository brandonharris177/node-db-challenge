const db = require('../data/db.config');

module.exports = {
    find,
}

function find() {
    return db('recipes');
}

// function findShoppingList(id) {
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