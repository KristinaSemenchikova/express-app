/* eslint-disable class-methods-use-this */
import { hashPassword } from '@utils/global';
import UserModel from '../models/users';

const withOutFields = { password: false, __v: false };

class UsersService {
  async signUp(data) {
    const { password, ...user } = data;
    const hashedPassword = await hashPassword(password);
    const newUser = await UserModel.create({
      password: hashedPassword,
      ...user,
    });
    return this.getById(newUser.id, false);
  }

  async getAll(populateField) {
    const query = UserModel.find({}, withOutFields);
    return populateField ? query.populate(populateField) : query;
  }

  async getPaginatedUsers(perPage = 10, page = 1) {
    const totalPages = await UserModel.countDocuments();
    if (page > totalPages) return [];
    const skip = Number(perPage * (page - 1));
    return UserModel.find({}, withOutFields, { skip, limit: +perPage });
  }

  async getOne(props = {}) {
    return UserModel.findOne(props);
  }

  async getById(id, withPassword = false, populateField) {
    const query = UserModel.findById(id, { __v: false, password: withPassword });
    return populateField ? query.populate(populateField) : query;
  }

  async update(id, data) {
    return UserModel.findByIdAndUpdate(id, data);
  }

  async delete(id) {
    await UserModel.findByIdAndDelete(id);
  }
}

const userService = new UsersService();

export default userService;

// async getPaginatedUsers(perPage = 10, page = 1) {
//   const totalPages = Math.ceil(this.users.length / perPage);
//   if (page > totalPages) return [];
//   if (page === 1 && totalPages === page) return this.users;
//   const fromIndex = perPage * (+page - 1);
//   const toIndex = perPage * page;
//   return this.users.slice(+fromIndex, +toIndex);
// }
