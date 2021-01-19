module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sex: {
      type: DataTypes.ENUM,
      values: ['male', 'female', 'other'],
    },
  }, {
    defaultScope: {
      attributes: { exclude: ['password'] },
    },
    scopes: {
      withPassword: {},
    },
  });
  User.associate = function (models) {
    User.hasMany(models.Post, { as: 'posts', foreignKey: 'creatorId' });
    User.belongsToMany(models.Post, { through: models.LikedPost, as: 'myLikes', foreignKey: 'likeUserId' });
  };
  User.initScopes = (models) => {
    User.addScope('withPosts', {
      attributes: { exclude: ['password'] },
      include: [{ model: models.Post, as: 'posts' }],
    });
    User.addScope('withLikes', {
      attributes: { exclude: ['password'] },
      include: [{ model: models.Post, as: 'myLikes' }],
    });
  };
  return User;
};
