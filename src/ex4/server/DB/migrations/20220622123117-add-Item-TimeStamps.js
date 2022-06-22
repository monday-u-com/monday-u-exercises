"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Items", "createdAt", {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn("now"),
    });
    await queryInterface.addColumn("Items", "updatedAt", {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.fn("now"),
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Items", "createdAt");
    await queryInterface.removeColumn("Items", "updatedAt");
  },
};
