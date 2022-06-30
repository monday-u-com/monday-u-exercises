'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Item',
      'done_timestamp', {
      type: Sequelize.DATE
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      'Item',
      'done_timestamp'
    );
  }
};