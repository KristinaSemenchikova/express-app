import { Op } from 'sequelize';
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
    return this.model.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.substring]: searchString } },
          { content: { [Op.substring]: searchString } },
        ],
      },
    });
  }

  async addPost(data, UserId) {
    return this.model.create({ ...data, UserId });
  }

  async delete(id) {
    return this.model.destroy({ where: { id } });
  }
}

const postService = new PostService(db.Post);

export default postService;
