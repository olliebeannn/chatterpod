import { Router } from 'express';
import PodcastController from '../controllers/PodcastController';

import requireLogin from '../middlewares/requireLogin';

const router = Router();

// Get all podcasts saved in DB - not user-facing
router.get('/', PodcastController.getAllPodcasts);
// Get all saved podcasts for this users
router.get('/saved', requireLogin, PodcastController.getSavedPodcasts);

// Get top 20 podcasts from Listen API
router.get('/top', PodcastController.getTopPodcasts);

// Save a new podcast to DB
router.post('/new', PodcastController.saveNewPodcast);

// Get podcast by ID
router.get('/:id', PodcastController.getPodcast);
// Save podcast with this ID to the logged in user
router.get('/:id/save', PodcastController.savePodcastToUser);
// Remove podcast with this ID from the logged in user
router.get('/:id/remove', PodcastController.removePodcastFromUser);

export default router;
