const { db } = require('./connection');
const { Dish } = require('./models/Dish');
const { Person } = require('./models/Person');

// Create your associations here!
Dish.belongsTo(Person, { as: 'person' });
Person.hasMany(Dish);

module.exports = {
  db,
  Dish,
  Person,
};
