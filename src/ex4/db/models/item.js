'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class item extends Model {}

  item.init(
    {
      name: {
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
      modelName: 'item',
    }
  );

  return item;
};
