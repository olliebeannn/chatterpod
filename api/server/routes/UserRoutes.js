import { Router } from 'express';
import UserService from '../services/UserService';
import UserController from '../controllers/UserController';
import Util from '../utils/Util';

const router = Router();
const util = new Util();

// Get all users (not user-facing route)
router.get('/', UserController.getAllUsers);

// Update route to separate case of user already existing vs creating new
router.post('/new', UserController.saveNewUser);

// GET /:id - pull details for user by id if found
router.get('/:id', UserController.getUser);

// GET /:id/podcasts - pull saved podcasts associated with chosen user
router.get('/:id/podcasts', UserController.getUserSavedPodcasts);

export default router;
