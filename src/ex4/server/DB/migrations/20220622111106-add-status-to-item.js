"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn("Items", "status", Sequelize.BOOLEAN);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.removeColumn("Items", "status");
  },
};
