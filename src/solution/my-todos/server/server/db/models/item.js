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
    id: {
      type: DataTypes.INTEGER,
      // autoIncrement: true,
      primaryKey: true
    },
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    message: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    pokemon_id: DataTypes.STRING,
    pokemon_name: DataTypes.STRING,
    pokemon_type: DataTypes.ARRAY(DataTypes.STRING),
    pokemon_image: DataTypes.STRING,
    done_timestamp: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Item',
    tableName: 'Item',
    timestamps: true
  });
  return Item;
};