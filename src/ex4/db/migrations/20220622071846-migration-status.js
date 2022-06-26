'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addColumn(
        'Items',
        'status',
        { type: Sequelize.DataTypes.BOOLEAN },
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
      await queryInterface.removeColumn('Items', 'status', { transaction });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw new Error(err);
    }
  },
};
