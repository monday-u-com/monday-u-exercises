'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Items', [{
      name: "Catch bulbasaur",
      isPokemon: true,
      pokemonId: 1,
      pokemonData: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Items', null, {});
  }
};

