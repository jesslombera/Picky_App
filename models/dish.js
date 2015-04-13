"use strict";
module.exports = function(sequelize, DataTypes) {
  var Dish = sequelize.define("Dish", {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Dish;
};