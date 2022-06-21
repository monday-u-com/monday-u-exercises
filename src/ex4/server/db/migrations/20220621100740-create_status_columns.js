'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn('Items', 'status', { type: Sequelize.BOOLEAN, defaultValue: false });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.removeColumn('Items', 'status');
  }
};
