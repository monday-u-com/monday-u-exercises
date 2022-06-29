'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'items', // table name
        'status', // new field name
        {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false
        },
      )])
  },

  async down(queryInterface, Sequelize) {
    return promise.all([
      queryInterface.removeColumn('items', 'status')
    ])
  }
};
