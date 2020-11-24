import { authUsersData } from '../models/auth';

class AuthService {
  constructor(authData) {
    this.authData = authData;
  }

  async addAuthUser(data) {
    this.authData.push({
      ...data,
      loggedInAt: new Date().toISOString(),
    });
    return true;
  }

  async updateAuthUserToken(token, userId) {
    this.authData = this.authData.map(authData => {
      if (authData.userId === userId) return { ...authData, token };
      return authData;
    });
  }

  async getAuthUser(token) {
    return this.authData.find((authData) => authData.token === token);
  }

  async removeAuthUser(userId) {
    this.authData = this.authData.filter((authData) => authData.userId === userId);
    return true;
  }
}

const authService = new AuthService(authUsersData);

export default authService;
