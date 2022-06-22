'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Todos', [{
      id : 0,
      task: "Catch balbasaur",
      isPokemon: true,
      pokemonId: 1,
      pokemonData: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize){
    return queryInterface.bulkDelete('Users', null, {});
  }
};
