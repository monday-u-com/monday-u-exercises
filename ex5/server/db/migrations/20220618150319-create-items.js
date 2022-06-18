'use strict';
module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.addColumn('Items', 'status', {
			type: Sequelize.BOOLEAN,
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('Items');
	},
};
