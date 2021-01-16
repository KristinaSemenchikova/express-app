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
    User.hasMany(models.Post);
  };
  User.initScopes = (models) => {
    User.addScope('withPosts', {
      attributes: { exclude: ['password'] },
      include: [{ model: models.Post }],
    });
  };
  return User;
};
