// Create Comment model
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define("Comment", {
    // Define Post attributes
    text: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        max: 255
      }
    }
  });

  // Add associations
  Comment.associate = models => {
    Comment.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
    Comment.belongsTo(models.Post, {
      foreignKey: {
        allowNull: false
      }
    });
    Comment.hasMany(models.CommentLike, {
      foreignKey: {
        onDelete: 'cascade'
      }
    });
  };

  return Comment;
};