import database from '../src/models';

class UserService {
  static async getAllUsers() {
    try {
      return await database.User.findAll();
    } catch (e) {
      throw e;
    }
  }

  static async findUserByEmail(email) {
    try {
      const existingUser = await database.User.findOne({
        where: { email: email }
      });

      if (existingUser) {
        return existingUser;
      } else {
        return null;
      }
    } catch (e) {
      throw e;
    }
  }

  static async findUserById(id) {
    try {
      const existingUser = await database.User.findOne({
        where: { id: id }
      });

      if (existingUser) {
        return existingUser;
      } else {
        return null;
      }
    } catch (e) {
      throw e;
    }
  }

  static async findUserPodcastsById(id) {
    try {
      console.log('findUserPodcastsById');

      const userData = await database.User.findOne({
        where: { id: id },
        include: ['podcast']
      });

      console.log(userData);

      if (userData) {
        return userData;
      } else {
        return null;
      }
    } catch (e) {
      throw e;
    }
  }

  static async createUser(newUser) {
    try {
      return await database.User.create(newUser);
    } catch (e) {
      throw e;
    }
  }
}

export default UserService;
