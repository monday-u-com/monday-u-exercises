"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
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
  Items.init(
    {
      itemName: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
      doneAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Items",
    }
  );
  return Items;
};
