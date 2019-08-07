import { Router } from 'express';

import EpisodeController from '../controllers/EpisodeController';

const router = Router();

// Pull all episodes cached in db; NOT user facing
router.get('/', EpisodeController.pullAllEpisodes);

// Pull episode with podcast info
router.get('/:id', EpisodeController.pullEpisodeWithPodcast);

export default router;
