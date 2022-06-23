"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("items", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      itemId: {
        type: Sequelize.STRING,
      },
      itemName: {
        type: Sequelize.STRING,
      },
      isPokemon: {
        type: Sequelize.BOOLEAN,
      },
      pokemonId: {
        type: Sequelize.INTEGER,
      },
      pokemonData: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.BOOLEAN,
        timestamps: true,

        updatedAt: true,
      },
      doneAt: {
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("items");
  },
};
