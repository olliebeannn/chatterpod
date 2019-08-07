import { Router } from 'express';

import EpisodeController from '../controllers/EpisodeController';

const router = Router();

// Pull all episodes cached in db; NOT user facing
router.get('/', EpisodeController.getAllEpisodes);

export default router;
