import { Router } from 'express';
import UserService from '../services/UserService';
import Util from '../utils/Util';

const router = Router();
const util = new Util();

router.get('/', async (req, res) => {
  try {
    const allUsers = await UserService.getAllUsers();

    if (allUsers.length > 0) {
      util.setSuccess(200, 'Users retrieved', allUsers);
    } else {
      util.setSuccess(200, 'No users found');
    }

    return util.send(res);
  } catch (e) {
    util.setError(400, e);
    return util.send(res);
  }
});

// Update route to separate case of user already existing vs creating new
router.post('/new', async (req, res) => {
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
    util.setError(400, e);
    return util.send(res);
  }
});

// FUTURE ROUTES
// GET /:id - pull details for that user if found
// GET /:id/podcasts - pull saved podcasts associated with this user

export default router;
