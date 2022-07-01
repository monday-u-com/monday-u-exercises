"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn("Items", "doneAt", {
      type: Sequelize.DATE,
      defaultValue: null,
    });
  },

  async down(queryInterface) {
    return await queryInterface.removeColumn("Items", "doneAt");
  },
};
