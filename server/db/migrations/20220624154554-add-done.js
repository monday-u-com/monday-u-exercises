"use strict";

module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.addColumn("Tasks", "done", {
         type: Sequelize.DataTypes.DATE,
      });
   },

   async down(queryInterface, Sequelize) {
      await queryInterface.removeColumn("Tasks", "done");
   },
};
