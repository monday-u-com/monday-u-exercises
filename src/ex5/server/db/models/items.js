'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
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
    itemId: DataTypes.STRING,
    item: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    isPokemon: DataTypes.BOOLEAN,
    pokemonId: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN,
    
  }, {
    sequelize,
    modelName: 'items',
    tableName:'items',
    timestamps: false
  });
  items.removeAttribute("id");
  return items;
};