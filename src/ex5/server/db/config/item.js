'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Item.init({
    itemId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
  
    },
    name: DataTypes.STRING,
    isPokemon: DataTypes.BOOLEAN,
    pokemonId: DataTypes.INTEGER,
    pokemonData: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Item',
    tableName: 'items',
    timestamps: false
   
  });
  return Item;
};