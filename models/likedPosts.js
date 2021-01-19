module.exports = (sequelize) => {
  const LikedPost = sequelize.define('LikedPost', {}, { timestamps: false });
  return LikedPost;
};
