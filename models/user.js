"use strict";

var bcrypt = require("bcrypt");
var salt = bcrypt.genSaltSync(10);

module.exports = function (sequelize, DataTypes){
  var User = sequelize.define('User', {
    email: { 
      type: DataTypes.STRING, 
      unique: true, 
      validate: {
        len: [6, 30],
      }
    },
    passwordDigest: {
      type:DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    }
  },



  {
    instanceMethods: {
      checkPassword: function(password) {
        return bcrypt.compareSync(password, this.passwordDigest);
      },

      addToFavs: function(db,dish,restaurant) {
        return db.Favorite
          .create({dish: dish, restaurant: restaurant, UserId: this.id});
      }
    },

  

    classMethods: {
    associate: function(models) {
        this.hasMany(models.Favorite);
      },
      
      encryptPassword: function(password) {
        var hash = bcrypt.hashSync(password, salt);
        return hash;
      },
      createSecure: function(email, password) {
        if(password.length < 6) {
          throw new Error("Password too short");
        }
        return this.create({
          email: email,
          passwordDigest: this.encryptPassword(password)
        });

      },
      authenticate: function(email, password) {
        // find a user in the DB
        return this.find({
          where: {
            email: email
          }
        }) 
        .then(function(user){
          if (user === null){
            throw new Error("Username does not exist");
          }
          else if (user.checkPassword(password)){
            return user;
          } else {
            return false; 
          }

        });
      },
    


    } // close classMethods
  }); // close define user
  return User;
}; // close User function