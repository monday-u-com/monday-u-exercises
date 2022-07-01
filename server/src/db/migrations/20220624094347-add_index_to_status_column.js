"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addIndex("Items", ["status"], {});
  },

  async down(queryInterface) {
    return await queryInterface.removeIndex("Items", ["status"]);
  },
};
