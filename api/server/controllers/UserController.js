import UserService from '../services/UserService';
import Util from '../utils/Util';

const util = new Util();

class UserController {
  static async getAllUsers(req, res) {
    try {
      const allUsers = await UserService.getAllUsers();

      if (allUsers.length > 0) {
        util.setSuccess(200, 'Users retrieved', allUsers);
      } else {
        util.setSuccess(200, 'No users found');
      }

      return util.send(res);
    } catch (e) {
      console.log('Error getting all users', e);
      util.setError(400, e);
      return util.send(res);
    }
  }

  static async saveNewUser(req, res) {
    if (!req.body.name | !req.body.email) {
      util.setError(400, 'Please provide complete user details');
      util.send(res);
    }

    const newUser = req.body;

    try {
      const existingUser = await UserService.findUserByEmail(newUser.email);

      if (existingUser) {
        util.setSuccess(200, 'User already exists', existingUser);
        return util.send(res);
      } else {
        const createdUser = await UserService.createUser(newUser);
        util.setSuccess(201, 'User created!', createdUser);
        return util.send(res);
      }
    } catch (e) {
      console.log('Error saving new user', e);
      util.setError(400, e);
      return util.send(res);
    }
  }

  static async getUser(req, res) {
    if (/\D+/.test(req.params.id)) {
      util.setError(
        400,
        `User ID is not formatted correctly; user IDs are numbers`
      );
      return util.send(res);
    }

    try {
      const existingUser = await UserService.findUserById(req.params.id);

      if (!existingUser) {
        util.setError(404, `Can't find user`);
        return util.send(res);
      }

      util.setSuccess(200, 'Found user', existingUser);
      return util.send(res);
    } catch (e) {
      util.setError(400, e);
      return util.send(res);
    }
  }

  static async getUserSavedPodcasts(req, res) {
    if (/\D+/.test(req.params.id)) {
      util.setError(
        400,
        `User ID is not formatted correctly; user IDs are numbers`
      );
      return util.send(res);
    }

    try {
      const userData = await UserService.findUserPodcastsById(req.params.id);

      if (!userData) {
        util.setError(404, `No user found with that id`);
        return util.send(res);
      }

      util.setSuccess(200, `Found user podcast data`, userData);
      return util.send(res);
    } catch (e) {
      util.setError(400, e);
      return util.send(res);
    }
  }
}

export default UserController;
