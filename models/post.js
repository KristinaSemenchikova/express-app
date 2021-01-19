module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {});
  Post.associate = function (models) {
    Post.belongsTo(models.User, { as: 'creator', foreignKey: 'creatorId' });
    Post.belongsToMany(models.User, { through: models.LikedPost, as: 'userLikes', foreignKey: 'likePostId' });
  };
  Post.initScopes = ({ User }) => {
    Post.addScope('withLikes', {
      include: [{ model: User, as: 'userLikes' }],
    });
    Post.addScope('withCreator', {
      include: [{ model: User, as: 'creator' }],
    });
  };
  return Post;
};
