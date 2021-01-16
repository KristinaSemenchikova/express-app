/* eslint-disable class-methods-use-this */
import { hashPassword } from '@utils/global';
import db from '../../../models';

class UsersService {
  constructor(model) {
    this.model = model;
  }

  async signUp(data) {
    const { password, ...user } = data;
    const hashedPassword = await hashPassword(password);
    const newUser = await this.model.create({
      password: hashedPassword,
      ...user,
    });
    return this.getById(newUser.id, false);
  }

  async getAll() {
    // const query = this.model.find({}, withOutFields);
    // return populateField ? query.populate(populateField) : query;
    return this.model.scope('withPosts').findAll();
  }

  async getPaginatedUsers(perPage = 10, page = 1) {
    const totalPages = await this.model.count();
    if (page > totalPages) return [];
    const offset = Number(perPage * (page - 1));
    return this.model.findAll({ offset, limit: +perPage });
  }

  async getByEmail(email) {
    return this.model.scope('withPassword').findOne({ where: { email } });
  }

  // eslint-disable-next-line no-unused-vars
  async getById(id, _withPassword = false, _populateField) {
    return this.model.findByPk(id);
  }

  async update(id, data) {
    return this.model.findByIdAndUpdate(id, data);
  }

  async delete(id) {
    await this.model.findByIdAndDelete(id);
  }
}

const userService = new UsersService(db.User);

export default userService;
