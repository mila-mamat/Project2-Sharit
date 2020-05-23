// Import dependencies

// Create Post model
module.exports = function(sequelize, DataTypes) {
  const Post = sequelize.define("post", {
    // Define Post attributes
    post_photo: {
      type: DataTypes.BLOB
    },
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
    }
  });

  return Post;
};