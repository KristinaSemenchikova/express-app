/* eslint-disable class-methods-use-this */
import { hashPassword } from '@utils/global';
import db from '../../../models';

const withOutFields = { password: false, __v: false };

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

  async getAll(populateField) {
    const query = this.model.find({}, withOutFields);
    return populateField ? query.populate(populateField) : query;
  }

  async getPaginatedUsers(perPage = 10, page = 1) {
    const totalPages = await this.model.countDocuments();
    if (page > totalPages) return [];
    const skip = Number(perPage * (page - 1));
    return this.model.find({}, withOutFields, { skip, limit: +perPage });
  }

  async getOne(where = {}) {
    return this.model.findOne({ where });
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

// async getPaginatedUsers(perPage = 10, page = 1) {
//   const totalPages = Math.ceil(this.users.length / perPage);
//   if (page > totalPages) return [];
//   if (page === 1 && totalPages === page) return this.users;
//   const fromIndex = perPage * (+page - 1);
//   const toIndex = perPage * page;
//   return this.users.slice(+fromIndex, +toIndex);
// }
