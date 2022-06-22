"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Items", "id");

    await queryInterface.addColumn("Items", "id", {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Items", "id", {
      type: Sequelize.INTEGER,
      autoIncrement: false,
      primaryKey: true,
    });
  },
};
