"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.renameColumn("Items", "ItemName", "itemName");
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.renameColumn("Items", "itemName", "ItemName");
  },
};
