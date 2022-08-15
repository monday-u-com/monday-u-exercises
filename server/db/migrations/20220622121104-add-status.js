"use strict";

module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.addColumn("Tasks", "status", {
         type: Sequelize.DataTypes.BOOLEAN,
      });
   },

   async down(queryInterface, Sequelize) {
      await queryInterface.removeColumn("Tasks", "status");
   },
};
