"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.addColumn("items", "doneAt", Sequelize.DATE);
	},

	async down(queryInterface, Sequelize) {
		return queryInterface.removeColumn("items", "doneAt");
	},
};
