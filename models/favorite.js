"use strict";
module.exports = function(sequelize, DataTypes) {
  var Favorite = sequelize.define("Favorite", {
    dish: DataTypes.STRING,
    restaurant: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        this.belongsTo(models.User);
        // associations can be defined here
      }
    }
  });
  return Favorite;
};