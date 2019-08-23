import { Router } from 'express';

import EpisodeController from '../controllers/EpisodeController';

import requireLogin from '../middlewares/requireLogin';
import checkIdFormat from '../middlewares/checkIdFormat';

const router = Router();

// Pull all episodes cached in db; NOT user facing
router.get('/', EpisodeController.pullAllEpisodes);

// Fetch episode details from API
router.get('/:id', checkIdFormat, EpisodeController.fetchEpisode);

// Pull episode from DB with podcast info (TEST ROUTE)
router.get(
  '/test/:id',
  checkIdFormat,
  EpisodeController.pullEpisodeWithPodcast
);

// WORKING TEST ROUTE: save API-formatted episode data to db
router.post('/new', EpisodeController.saveEpisodeFromApi);

export default router;
