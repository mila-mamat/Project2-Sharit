// Import dependencies

// Create Comment model
module.exports = function(sequelize, DataTypes) {
  const Comment = sequelize.define("comment", {
    // Define Post attributes
    text: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        max: 255
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: true
      }
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: true
      }
    }
  });

  return Comment;
};