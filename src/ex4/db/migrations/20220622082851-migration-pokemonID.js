'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addColumn(
        'Items',
        'pokemonId',
        { type: Sequelize.DataTypes.INTEGER, allowNull: true },
        { transaction }
      );
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw new Error(err);
    }
  },

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeColumn('Items', 'pokemonId', { transaction });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw new Error(err);
    }
  },
};
