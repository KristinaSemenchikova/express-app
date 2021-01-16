import db from '../../../models';
/* eslint-disable class-methods-use-this */

class PostService {
  constructor(model) {
    this.model = model;
  }

  async getAll() {
    return this.model.findAll();
  }

  async search(searchString) {
    return this.model.find({
      $text: {
        $search: `\"${searchString}\"`, // eslint-disable-line no-useless-escape
      },
    });
  }

  async addPost(data, UserId) {
    return this.model.create({ ...data, UserId });
  }

  async delete(id) {
    return this.model.findByIdAndDelete(id);
  }
}

const postService = new PostService(db.Post);

export default postService;
