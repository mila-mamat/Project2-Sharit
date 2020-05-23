// Import dependencies

// Create Like model
module.exports = function(sequelize, DataTypes) {
  const Like = sequelize.define("like", {
    // Define Post attributes
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: true
      }
    },
    post_id: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: true
      }
    },
    comment_id: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: true
      }
    }
  });

  return Like;
};