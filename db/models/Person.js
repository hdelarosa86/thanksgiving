const Sequelize = require('sequelize');
const { db } = require('../connection');

const Person = db.define('person', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    notEmpty: true,
  },
  isAttending: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

module.exports = { Person };
