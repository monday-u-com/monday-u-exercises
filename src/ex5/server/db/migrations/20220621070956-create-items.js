// 'use strict';
// export function up(queryInterface, Sequelize) {
//   await queryInterface.createTable('Items', {
//     id: {
//       allowNull: false,
//       autoIncrement: true,
//       primaryKey: true,
//       type: Sequelize.INTEGER
//     },
//     itemId: {
//       type: Sequelize.STRING
//     },
//     title: {
//       type: Sequelize.STRING
//     },
//     isPokemon: {
//       type: Sequelize.BOOLEAN
//     },
//     pokemonId: {
//       type: Sequelize.INTEGER
//     },
//     pokemonData: {
//       type: Sequelize.STRING
//     },
//     createdAt: {
//       allowNull: false,
//       type: Sequelize.DATE
//     },
//     updatedAt: {
//       allowNull: false,
//       type: Sequelize.DATE
//     }
//   });
// }
// export function down(queryInterface, Sequelize) {
//   await queryInterface.dropTable('Items');
// }
'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Todos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      task: {
        type: Sequelize.STRING
      },
      completed: {
        type: Sequelize.BOOLEAN
      },
      isPokemon: {
      type: Sequelize.BOOLEAN
      },
      pokemonId: {
      type: Sequelize.INTEGER
      },
      pokemonData: {
      type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Todos');
  }
};