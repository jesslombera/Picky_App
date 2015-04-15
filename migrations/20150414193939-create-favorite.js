"use strict";
module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable("Favorites", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      dish: {
        type: DataTypes.STRING
      },
      restaurant: {
        type: DataTypes.STRING
      },
      UserId: {
        type: DataTypes.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    }).done(done);
  },
  down: function(migration, DataTypes, done) {
    migration.dropTable("Favorites").done(done);
  }
};