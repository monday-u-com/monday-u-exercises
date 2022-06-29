"use strict"
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Items", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id: {
        type: Sequelize.INTEGER,
      },
      ItemName: {
        type: Sequelize.STRING,
      },
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Items")
  },
}
