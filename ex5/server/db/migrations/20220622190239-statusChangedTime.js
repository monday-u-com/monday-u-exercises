'use strict';
module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.addColumn('Items', 'taskDoneAt', Sequelize.DATE);
	},
	async down(queryInterface, Sequelize) {
		return queryInterface.removeColumn('Items', 'taskDoneAt');
	},
};
