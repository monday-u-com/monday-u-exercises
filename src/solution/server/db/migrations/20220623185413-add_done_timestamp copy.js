'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Items',
      'item_done_timestamp', {
      type: Sequelize.DATE
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      'Items',
      'item_done_timestamp'
    );
  }
};