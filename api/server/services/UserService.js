import database from '../src/models';
const User = database.user;

class UserService {
  // rename pullAllUsers()
  static async getAllUsers() {
    try {
      return await User.findAll();
    } catch (e) {
      throw e;
    }
  }

  // rename pullUserByEmail()
  static async findUserByEmail(email) {
    try {
      const existingUser = await User.findOne({
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

  // rename pullUser()
  static async findUserById(id) {
    try {
      const existingUser = await User.findOne({
        where: { userId: id }
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

  // rename pullPodcastsForUser(userId)
  static async findUserPodcastsById(id) {
    try {
      console.log('findUserPodcastsById');

      const userData = await User.findOne({
        where: { userId: id },
        include: ['podcasts']
      });

      // console.log('userData', userData);

      if (userData) {
        return userData;
      } else {
        return null;
      }
    } catch (e) {
      throw e;
    }
  }

  // rename saveUser, make it check if they exist already?
  static async createUser(newUser) {
    try {
      return await User.create(newUser);
    } catch (e) {
      throw e;
    }
  }
}

export default UserService;
