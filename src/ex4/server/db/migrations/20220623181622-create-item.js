"use strict";
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable(
			"items",
			{
				id: {
					allowNull: false,
					autoIncrement: true,
					primaryKey: true,
					type: Sequelize.INTEGER,
				},
				itemName: {
					type: Sequelize.STRING,
				},
				pokedexId: {
					type: Sequelize.INTEGER,
				},
				createdAt: {
					allowNull: false,
					type: Sequelize.DATE,
				},
				updatedAt: {
					allowNull: false,
					type: Sequelize.DATE,
				},
			},
			{
				indexes: [
					{
						unique: true,
						fields: ["id"],
					},
					{
						fields: ["ItemName", "status", "Done", "createdAt"],
					},
				],
			}
		);
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("items");
	},
};
