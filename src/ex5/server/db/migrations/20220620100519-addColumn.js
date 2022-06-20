'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'Items',
      'completed',
     Sequelize.BOOLEAN
    );
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'Items',
      'completed',
     Sequelize.BOOLEAN
    );
  }
};
