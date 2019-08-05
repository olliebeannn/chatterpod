import axios from 'axios';

import database from '../src/models';
const Podcast = database.podcast;

class PodcastService {
  static async getAllPodcasts() {
    try {
      return await Podcast.findAll();
    } catch (e) {
      throw e;
    }
  }

  static async getPodcastFromDb(podcastId) {
    try {
      return await Podcast.findOne({
        where: { podcastId: podcastId },
        include: ['genres']
      });
    } catch (e) {
      throw e;
    }
  }

  // Doesn't check for existence of podcast before creating; use findPodcastById first
  static async createPodcast(newPodcast) {
    try {
      return await Podcast.create(newPodcast);
    } catch (e) {
      throw e;
    }
  }

  // Doesn't check if userId exists; should do that in controller or route
  static async savePodcastToUser(podcastId, userId) {
    try {
      const podcast = await Podcast.findOne({
        where: { podcastId: podcastId }
      });
      // NEEDS error handling on if association already exists
      return await podcast.addUser(userId);
    } catch (e) {
      console.log(e);
    }
  }

  static async getPodcastFromApi(id) {
    let response = await axios.get(
      `https://listen-api.listennotes.com/api/v2/podcasts/${id}`,
      {
        headers: {
          'X-ListenAPI-Key': process.env.listenAPIKey
        }
      }
    );

    if (response.status == 200) {
      return response.data;
    }
  }

  static async savePodcastToDb(podcast) {
    let newPodcast = {};

    newPodcast.podcastId = podcast.id;
    newPodcast.title = podcast.title;

    if (podcast.description) {
      // Make sure description won't overflow
      if (podcast.description.length > MAX_PODCAST_DESCRIPTION_LEN) {
        newPodcast.description = podcast.description.substring(
          0,
          MAX_PODCAST_DESCRIPTION_LEN - 1
        );
      } else {
        newPodcast.description = podcast.description;
      }
    }

    if (podcast.thumbnail) {
      newPodcast.thumbnail = podcast.thumbnail;
    }

    if (podcast.website) {
      newPodcast.website = podcast.website;
    }

    try {
      var savedPodcast = await PodcastService.createPodcast(newPodcast);
    } catch (e) {
      console.log('Problem saving new podcast', e);
      util.setError(400, e);
      return util.send(res);
    }

    try {
      var savedPodcastWithGenres = await savedPodcast.addGenres(
        podcast.genre_ids
      );
    } catch (e) {
      console.log('Problem saving genres to new podcast', e);
      util.setError(400, e);
      return util.send(res);
    }

    return savedPodcastWithGenres;
  }
}

export default PodcastService;
