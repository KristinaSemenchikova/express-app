/* eslint-disable class-methods-use-this */
import { hashPassword } from '@utils/global';
import UserModel from '@models/users';

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
    return UserModel.findById(id, { password: false, __v: false });
  }

  async add(userData) {
    const { password, ...user } = userData;
    const hashedPassword = await hashPassword(password);
    const newUser = await UserModel.create({
      ...user, password: hashedPassword,
    });
    // eslint-disable-next-line no-underscore-dangle
    return this.getById(newUser._id);
  }

  async update(data, id) {
    const foundUser = this.users.find((user) => user.id === +id);
    if (!foundUser) return false;

    const updatedUser = {
      ...foundUser,
      ...data,
    };
    this.users = this.users.map((user) => {
      if (user.id === +id) return updatedUser;
      return user;
    });
    return updatedUser;
  }

  async remove(id) {
    await UserModel.deleteOne({ _id: id });
  }
}

const userService = new UsersService();

export default userService;
