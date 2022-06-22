'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class Items extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    
  }
  Items.init({
    itemId: DataTypes.STRING,
    name: DataTypes.STRING,
    isPokemon: DataTypes.BOOLEAN,
    pokemonId: DataTypes.INTEGER,
    pokemonData: DataTypes.STRING
  }, {
    sequelize,
    tableName: 'items',
    modelName: 'Item',
  });
  return Items;
};