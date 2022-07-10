"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.addColumn("items", "status", Sequelize.BOOLEAN);
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.removeColumn("items", "status");
	},
};
