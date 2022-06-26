'use strict';
const { Model } = require('sequelize');

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
  Item.init(
    {
      ItemName: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
        },
      },
      status: {
        type: DataTypes.BOOLEAN,
        validate: {
          notEmpty: true,
        },
      },
      pokemonId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: 'Item',
    }
  );

  return Item;
};
