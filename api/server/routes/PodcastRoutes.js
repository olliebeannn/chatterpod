import { Router } from 'express';
import PodcastService from '../services/PodcastService';
import PodcastController from '../controllers/PodcastController';
import Util from '../utils/Util';

const router = Router();
const util = new Util();

router.get('/', PodcastController.getAllPodcasts);
router.post('/new', PodcastController.saveNewPodcast);
router.get('/:id', PodcastController.getPodcast);
router.get('/:id/save', PodcastController.savePodcastToUser);

export default router;
