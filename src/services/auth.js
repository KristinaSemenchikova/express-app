/* eslint-disable class-methods-use-this */
import { hashPassword } from '@utils/global';
import AuthInfoModel from '../models/auth';

class AuthService {
  async signUp(email, password) {
    const hashedPassword = await hashPassword(password);
    const newUser = await AuthInfoModel.create({
      email,
      password: hashedPassword,
    });
    return this.getById(newUser.id, false);
  }

  async getById(id, withPassword = true) {
    return AuthInfoModel.findById(id, { password: withPassword, __v: false });
  }

  async getByEmail(email) {
    return AuthInfoModel.findOne({ email });
  }

  async addUser(id, userId) {
    return AuthInfoModel.findByIdAndUpdate(id, { user: userId });
  }
}

const authService = new AuthService();

export default authService;
