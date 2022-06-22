"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addIndex("items", ["isPokemon"]).then(() => {
      return queryInterface.addIndex("items", ["status"]);
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeIndex("items", ["isPokemon"]).then(() => {
      return queryInterface.removeIndex("items", ["status"]);
    });
  },
};
