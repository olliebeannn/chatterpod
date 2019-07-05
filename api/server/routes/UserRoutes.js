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

router.post('/new', async (req, res) => {
  if (!req.body.name | !req.body.email) {
    util.setError(400, 'Please provide complete user details');
    util.send(res);
  }

  const newUser = req.body;

  try {
    const createdUser = await UserService.createUser(newUser);
    util.setSuccess(201, 'User created!', createdUser);
    return util.send(res);
  } catch (e) {
    util.setError(400, e);
    return util.send(res);
  }
});

export default router;
