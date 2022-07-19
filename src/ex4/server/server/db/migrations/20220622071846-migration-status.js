'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.addColumn('items', 'status', {
        type: Sequelize.DataTypes.BOOLEAN,
      });
    } catch (err) {
      throw new Error(err);
    }
  },

  async down(queryInterface, Sequelize) {
    try {
      await queryInterface.removeColumn('items', 'status');
    } catch (err) {
      throw new Error(err);
    }
  },
};
