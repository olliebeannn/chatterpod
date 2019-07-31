import axios from 'axios';

import PodcastService from '../services/PodcastService';
import UserService from '../services/UserService';
import UserPodcastService from '../services/UserPodcastService';
import Util from '../utils/Util';

const util = new Util();

const MAX_PODCAST_DESCRIPTION_LEN = 1024;

class PodcastController {
  // Helper method to pull podcast info from ListenNotes API
  // Should only be used inside other PodcastController methods
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

  static async getAllPodcasts(req, res) {
    try {
      const allPodcasts = await PodcastService.getAllPodcasts();

      if (allPodcasts.length > 0) {
        util.setSuccess(200, 'Podcasts retrieved', allPodcasts);
      } else {
        util.setSuccess(200, 'No podcasts found');
      }
      return util.send(res);
    } catch (e) {
      console.log('error getting all podcasts!', e);
      util.setError(400, e);
      return util.send(res);
    }
  }

  static async saveNewPodcast(req, res) {
    if (!req.body.podcastId | !req.body.title) {
      util.setError(
        400,
        'You must include an ID and title to create save a podcast'
      );
    }

    const newPodcast = req.body;

    try {
      const existingPodcast = await PodcastService.getPodcastFromDb(
        newPodcast.podcastId
      );

      if (existingPodcast) {
        util.setSuccess(201, 'Podcast already exists!', existingPodcast);
        return util.send(res);
      }

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
  }

  // GET /:id - get this podcast's details if they exist; pull from API if not (and cache?)
  // CHANGING: pull from API every time, no saving - so we can get episode info
  static async getPodcast(req, res) {
    if (/\W+/.test(req.params.id)) {
      util.setError(
        400,
        `PodcastID is not formatted correctly; it should only contain alphanumeric chars`
      );
      return util.send(res);
    }

    let podcast = null;

    // Pull from ListenAPI
    try {
      podcast = await PodcastController.getPodcastFromApi(req.params.id);
    } catch (e) {
      console.log('Problem getting podcast data from Listen API', e);
      util.setError(400, e);
      return util.send(res);
    }

    util.setSuccess(200, `Found podcast data`, podcast);
    return util.send(res);
  }

  // POST /:id - save this podcast to user's favourites, cache if not in DB already
  static async savePodcastToUser(req, res) {
    // Check the podcastId is well formatted
    if (/\W+/.test(req.params.id)) {
      util.setError(
        400,
        `PodcastID is not formatted correctly; it should only contain alphanumeric chars`
      );
      return util.send(res);
    }

    // Check there is a logged in user
    if (!req.user) {
      util.setError(400, `No user logged in, can't save podcast`);
      return util.send(res);
    }

    // Check if already saved to user, return user_podcasts record if so
    try {
      const userPodcast = await UserPodcastService.getUserPodcast(
        req.user.userId,
        req.params.id
      );

      if (userPodcast) {
        util.setSuccess(
          200,
          `User with id ${req.user.userId} has already saved podcast with id ${
            req.params.id
          }`,
          userPodcast
        );
        return util.send(res);
      }
    } catch (e) {
      console.log('problem getting user_podcast record', e);
      util.setError(400, e);
      return util.send(res);
    }

    let podcast;

    // Check the podcast exists in DB already
    try {
      podcast = await PodcastService.getPodcastFromDb(req.params.id);
    } catch (e) {
      console.log('Problem getting podcast from DB', e);
      util.setError(400, e);
      return util.send(res);
    }

    // NOTE: Get podcast data from ListenAPI if not in DB, save to DB
    if (!podcast) {
      try {
        var apiPodcastData = await PodcastController.getPodcastFromApi(
          req.params.id
        );
      } catch (e) {
        console.log('Problem getting podcast data from Listen API', e);
        util.setError(400, e);
        return util.send(res);
      }

      try {
        podcast = await PodcastController.savePodcastToDb(apiPodcastData);
      } catch (e) {
        console.log('Problem saving podcast pulled from ListenAPI to DB', e);
        util.setError(400, e);
        return util.send(res);
      }
    }

    // Create an association between this podcast and user
    try {
      let updatedPodcast = await PodcastService.savePodcastToUser(
        req.params.id,
        req.user.userId
      );

      if (updatedPodcast) {
        util.setSuccess(200, `Saved podcast for user`, updatedPodcast);
        return util.send(res);
      }
    } catch (e) {
      console.log('Error saving podcast to user', e);
      util.setError(400, e);
      return util.send(res);
    }
  }

  static async getSavedPodcasts(req, res) {
    if (!req.user) {
      util.setError(
        400,
        `Can't fetch user's saved podcasts when no user is logged in`
      );
      return util.send(res);
    }

    try {
      const userData = await UserService.findUserPodcastsById(req.user.userId);

      if (!userData) {
        util.setError(404, `No user found with that id`);
        return util.send(res);
      }

      util.setSuccess(200, `Found user podcast data`, userData);
      return util.send(res);
    } catch (e) {
      util.setError(400, e);
      return util.send(res);
    }
  }

  static async getTopPodcasts(req, res) {
    try {
      let response = await axios.get(
        'https://listen-api.listennotes.com/api/v2/best_podcasts?region=us',
        {
          headers: {
            'X-ListenAPI-Key': process.env.listenAPIKey
          }
        }
      );
      util.setSuccess(200, 'Got top podcasts', response.data.podcasts);
      return util.send(res);
    } catch (e) {
      console.log('Error with request to get top podcasts', e);
      util.setError(400, 'There was a problem getting top podcasts');
      return util.send(res);
    }
  }
}

export default PodcastController;
