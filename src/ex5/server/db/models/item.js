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
    itemId: DataTypes.STRING,
    itemName: DataTypes.STRING,
    isPokemon: DataTypes.BOOLEAN,
    pokemonId: DataTypes.INTEGER,
    pokemonData: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    doneAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Item',
    tableName: 'items',
    timestamps: false
  });
  Item.removeAttribute('id');
  return Item;
};