// Import dependencies
const bcrypt = require("bcryptjs");

// Create User model
module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define("User", {
    // Define User attributes
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [6, 30],
        isAlphanumeric: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 60],
        isAlpha: true
      }
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 60],
        isAlpha: true
      }
    },
    profile_photo: {
      type: DataTypes.BLOB
    },
    birthdate: {
      type: DataTypes.DATE(6),
      validate: {
        isDate: true
      }
    },
    sex: {
      type: DataTypes.STRING,
      validate: {
        len: [4, 6],
        isAlpha: true
      }
    },
    city: {
      type: DataTypes.STRING,
      validate: {
        len: [2, 60],
        isAlpha: true
      }
    },
    province: {
      type: DataTypes.STRING,
      validate: {
        len: [2, 60],
        isAlpha: true
      }
    },
    country: {
      type: DataTypes.STRING,
      validate: {
        len: [2, 60],
        isAlpha: true
      }
    }
  });

  // Create method to check if unhashed password provided by user can be compared with hashed password in database
  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
  
  // Create hook to automatically hash password provided by user prior to storing in database
  User.addHook("beforeCreate", function(user) {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  });

  return User;
};
