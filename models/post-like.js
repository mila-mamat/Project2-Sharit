// Create Post Like model
module.exports = (sequelize, DataTypes) => {
  const PostLike = sequelize.define("PostLike");

  // Add associations
  PostLike.associate = models => {
    PostLike.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
    PostLike.belongsTo(models.Post, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return PostLike;
};