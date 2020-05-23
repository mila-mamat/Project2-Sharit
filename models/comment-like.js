// Create Comment Like model
module.exports = (sequelize, DataTypes) => {
  const CommentLike = sequelize.define("CommentLike");

  // Add associations
  CommentLike.associate = models => {
    CommentLike.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
    CommentLike.belongsTo(models.Comment, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return CommentLike;
};