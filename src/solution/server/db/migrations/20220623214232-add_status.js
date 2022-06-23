'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Items',
      'item_status', {
      type: Sequelize.BOOLEAN
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      'Items',
      'item_status'
    );
  }
};