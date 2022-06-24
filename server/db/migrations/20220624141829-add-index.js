module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.addIndex("Tasks", ["id"]);
   },

   async down(queryInterface, Sequelize) {
      await queryInterface.removeIndex("Tasks", ["id"]);
   },
};
