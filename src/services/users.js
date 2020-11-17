import { allUsers } from '../models/users';

class UsersService {
  constructor(users) {
    this.users = [...users];
  }

  async getAll() {
    return this.users;
  }

  async getPaginatedUsers(perPage = 10, page = 1) {
    const totalPages = Math.ceil(this.users.length / perPage);
    if (page > totalPages) return [];
    if (page === 1 && totalPages === page) return this.users;
    const fromIndex = perPage * (+page - 1);
    const toIndex = perPage * page;
    return this.users.slice(+fromIndex, +toIndex);
  }

  async getById(id) {
    return this.users.find((user) => user.id === +id);
  }

  async add(user) {
    const newUser = {
      id: Date.now(),
      ...user,
    };
    this.users.push(newUser);
    return newUser;
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
    const foundUser = this.users.find((user) => user.id === +id);
    if (!foundUser) return false;
    this.users = this.users.filter((user) => user.id !== id);
    return true;
  }
}

const userService = new UsersService(allUsers);

export default userService;
