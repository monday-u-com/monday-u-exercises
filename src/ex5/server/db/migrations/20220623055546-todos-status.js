'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.addColumn(
      'Items', // table name
      'status', // new field name
      {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
    )
  

},

async down(queryInterface, Sequelize) {
  // logic for reverting the changes
    await queryInterface.removeColumn('Items', 'status')
},
};
