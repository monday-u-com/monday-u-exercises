'use strict';
const {
  Model
} = require('sequelize');

var DataTypes = require('sequelize/lib/data-types');

module.exports = (sequelize) => {
  class items extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  items.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    itemName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'items',
  });
  return items;
};