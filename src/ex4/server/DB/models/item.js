"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    static associate(models) {}
  }
  Item.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      itemName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      status: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      doneAt: {
        allowNull: true,
        type: DataTypes.DATE,
      },
      position: {
        allowNull: false,
        type: DataTypes.INTEGER,
        defaultValue: -1,
      },
    },
    { sequelize, modelName: "Item" }
  );

  return Item;
};
