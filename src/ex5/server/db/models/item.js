"use strict";
export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("Todos", {
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
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable("Items");
}