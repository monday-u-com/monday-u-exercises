"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("Items", "position", {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: -1,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn("Items", "position", {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  },
};
