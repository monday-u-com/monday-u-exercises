"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Items", {
      itemId: {
        type: Sequelize.STRING,
      },
      name: {
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
     
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Items");
  },
};
