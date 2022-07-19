'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.addColumn('items', 'pokemonId', {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: true,
      });
    } catch (err) {
      throw new Error(err);
    }
  },

  async down(queryInterface, Sequelize) {
    try {
      await queryInterface.removeColumn('items', 'pokemonId');
    } catch (err) {
      throw new Error(err);
    }
  },
};
