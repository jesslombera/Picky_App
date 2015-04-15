"use strict";
module.exports = function(sequelize, DataTypes) {
  var Restaurant = sequelize.define("Restaurant", {
    location: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        this.hasMany(models.Dish);
        // associations can be defined here
      }
    }
  });
  return Restaurant;
};