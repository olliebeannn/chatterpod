import database from '../src/models';

class UserService {
  static async getAllUsers() {
    try {
      return await database.User.findAll();
    } catch (e) {
      throw e;
    }
  }

  static async createNewUser(newUser) {
    try {
      return await database.User.create(newUser);
    } catch (e) {
      throw e;
    }
  }
}

export default UserService;
