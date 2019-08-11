import { Router } from 'express';

import EpisodeController from '../controllers/EpisodeController';

const router = Router();

// Pull all episodes cached in db; NOT user facing
router.get('/', EpisodeController.pullAllEpisodes);

// Fetch episode details from API
router.get('/:id', EpisodeController.fetchEpisode);

// Pull episode from DB with podcast info (TEST ROUTE)
router.get('/test/:id', EpisodeController.pullEpisodeWithPodcast);

export default router;
