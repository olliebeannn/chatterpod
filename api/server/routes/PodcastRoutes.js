import { Router } from 'express';
import PodcastService from '../services/PodcastService';
import Util from '../utils/Util';

const router = Router();
const util = new Util();

router.get('/', async (req, res) => {
  try {
    console.log(PodcastService.getAllPodcasts);

    const allPodcasts = await PodcastService.getAllPodcasts();

    console.log(allPodcasts);

    if (allPodcasts.length > 0) {
      util.setSuccess(200, 'Podcasts retrieved', allPodcasts);
    } else {
      util.setSuccess(200, 'No podcasts found');
    }

    return util.send(res);
  } catch (e) {
    console.log("there's an error!");

    util.setError(400, e);
    return util.send(res);
  }
});

router.post('/new', async (req, res) => {
  if (!req.body.id | !req.body.title) {
    util.setError(
      400,
      'You must include an ID and title to create save a podcast'
    );
  }

  const newPodcast = req.body;

  console.log(newPodcast);

  try {
    const createdPodcast = await PodcastService.createPodcast(newPodcast);
    if (createdPodcast) {
      util.setSuccess(201, 'Podcast created!', createdPodcast);
      return util.send(res);
    } else {
      util.setError(400, 'There was an error saving the new podcast');
      return util.send(res);
    }
  } catch (e) {
    util.setError(400, e);
    return util.send(res);
  }
});

export default router;
