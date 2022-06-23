'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('items', [{
      id : 0,
      itemId: 1,
      item: "catch Ivysor",
      pokemonId: 3,
      imageUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
      isPokemon: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize){
    return queryInterface.bulkDelete('items', null, {});
  }
};
