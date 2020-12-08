/* eslint-disable class-methods-use-this */
import UserModel from '../models/users';

class UsersService {
  async getAll() {
    return UserModel.find({}, { password: false, __v: false });
  }

  async getUsers(perPage = 10, page = 1) {
    const totalPages = await UserModel.countDocuments();
    if (page > totalPages) return [];
    const skip = Number(perPage * (page - 1));
    return UserModel.find({}, null, { skip, limit: +perPage });
  }

  async getPaginatedUsers(perPage = 10, page = 1) {
    const totalPages = Math.ceil(this.users.length / perPage);
    if (page > totalPages) return [];
    if (page === 1 && totalPages === page) return this.users;
    const fromIndex = perPage * (+page - 1);
    const toIndex = perPage * page;
    return this.users.slice(+fromIndex, +toIndex);
  }

  async getOne(props = {}) {
    return UserModel.findOne(props);
  }

  async getById(id) {
    return UserModel.findById(id, { __v: false, credentials: false }).populate('posts');
  }

  async add(userData, authInfoId) {
    const newUser = await UserModel.create({ ...userData, credentials: authInfoId });
    return this.getById(newUser.id);
  }

  async update(id, data) {
    return UserModel.findByIdAndUpdate(id, data);
  }

  async remove(id) {
    await UserModel.findByIdAndDelete(id);
  }
}

const userService = new UsersService();

export default userService;
