"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
   class Task extends Model {
      /**
       * Helper method for defining associations.
       * This method is not a part of Sequelize lifecycle.
       * The `models/index` file will call this method automatically.
       */
      static associate(models) {
         // define association here
      }
   }

   Task.init(
      {
         text: { type: DataTypes.STRING, allowNull: false, validate: { notEmpty: true } },
         pokemonID: DataTypes.INTEGER,
         pokemonName: DataTypes.STRING,
         pokemonType: DataTypes.STRING,
         imageURL: { type: DataTypes.STRING, validate: { isUrl: true } },
         status: DataTypes.BOOLEAN,
         done: DataTypes.DATE,
         deleted: DataTypes.DATE,
      },
      {
         sequelize,
         modelName: "Task",
         indexes: [{ unique: true, fields: ["id"] }],
      }
   );
   return Task;
};
