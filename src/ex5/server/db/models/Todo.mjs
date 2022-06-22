'use strict';
export default function(sequelize, DataTypes) {
  var Todos = sequelize.define('Items', {
    task: DataTypes.STRING,
    completed: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Todos;
};