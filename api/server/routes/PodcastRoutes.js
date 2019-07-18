import { Router } from 'express';
import PodcastService from '../services/PodcastService';
import PodcastController from '../controllers/PodcastController';
import Util from '../utils/Util';

const router = Router();
const util = new Util();

// Get all podcasts saved in DB - not user-facing
router.get('/', PodcastController.getAllPodcasts);
// Get all saved podcasts for this users
router.get('/saved', PodcastController.getSavedPodcasts);

// Save a new podcast to DB
router.post('/new', PodcastController.saveNewPodcast);

// Get podcast by ID
router.get('/:id', PodcastController.getPodcast);
// Save podcast with this ID to the logged in user
router.get('/:id/save', PodcastController.savePodcastToUser);

export default router;
