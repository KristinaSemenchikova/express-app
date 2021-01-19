import db from '../../../models';

class LikedPostService {
  constructor(model) {
    this.model = model;
  }

  async getUsersLikedPosts(likeUserId) {
    return this.model.findAll({ where: { likeUserId } });
  }

  async addLike(likePostId, likeUserId) {
    return this.model.create({ likePostId, likeUserId });
  }

  async removeLike(likePostId, likeUserId) {
    return this.model.destroy({ where: { likePostId, likeUserId } });
  }
}

const likedPostService = new LikedPostService(db.LikedPost);

export default likedPostService;
