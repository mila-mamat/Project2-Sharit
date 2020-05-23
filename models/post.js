// Create Post model
module.exports = function(sequelize, DataTypes) {
  const Post = sequelize.define("Post", {
    // Define Post attributes
    post_photo: {
      type: DataTypes.STRING
    },
    text: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        max: 255
      }
    }
  });

  // Add associations
  Post.associate = models => {
    Post.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Post;
};