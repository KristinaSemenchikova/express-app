import PostModel from '../models/posts';
/* eslint-disable class-methods-use-this */

class PostService {
  async getAll() {
    return PostModel.find();
  }

  async search(searchString) {
    return PostModel.find({
      $text: {
        $search: `\"${searchString}\"`, // eslint-disable-line no-useless-escape
      },
    });
  }

  async addPost(data, userId) {
    return PostModel.create({ ...data, user: userId });
  }

  async delete(id) {
    return PostModel.findByIdAndDelete(id);
  }
}

const postService = new PostService();

export default postService;
