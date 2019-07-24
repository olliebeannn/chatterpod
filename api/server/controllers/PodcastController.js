import axios from 'axios';

import PodcastService from '../services/PodcastService';
import UserService from '../services/UserService';
import Util from '../utils/Util';

const util = new Util();

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
    // if (podcast.description) {
    //   newPodcast.description = podcast.description;
    // }
    if (podcast.thumbnail) {
      newPodcast.thumbnail = podcast.thumbnail;
    }
    if (podcast.website) {
      newPodcast.website = podcast.website;
    }

    try {
      let savedPodcast = PodcastService.createPodcast(newPodcast);
      return savedPodcast;
    } catch (e) {
      console.log('Problem saving new podcast');
      util.setError(400, e);
      return util.send(res);
    }
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
      console.log('error getting all podcasts!');
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
      const existingPodcast = await PodcastService.findPodcastById(
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
  static async getPodcast(req, res) {
    if (/\W+/.test(req.params.id)) {
      util.setError(
        400,
        `PodcastID is not formatted correctly; it should only contain alphanumeric chars`
      );
      return util.send(res);
    }

    let podcastData = null;

    // Look for podcast data in DB first
    try {
      podcastData = await PodcastService.findPodcastById(req.params.id);
    } catch (e) {
      console.log('Problem getting podcast from DB');
      util.setError(400, e);
      return util.send(res);
    }

    if (podcastData) {
      util.setSuccess(200, `Found podcast data`, podcastData);
      return util.send(res);
    }

    // Pull from ListenAPI if that doesn't work
    try {
      podcastData = await PodcastController.getPodcastFromApi(req.params.id);
    } catch (e) {
      console.log('Problem getting podcast data from Listen API');
      util.setError(400, e);
      return util.send(res);
    }

    // console.log('podcastData', podcastData);

    // Save the ListenNotes podcast to the DB
    try {
      let savedPodcast = await PodcastController.savePodcastToDb(podcastData);
    } catch (e) {
      console.log('Problem saving podcast pulled from ListenAPI to DB');
      util.setError(400, e);
      return util.send(res);
    }

    util.setSuccess(200, `Found podcast data`, podcastData);
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

    try {
      // Check the podcast actually exists
      const podcastData = await PodcastService.findPodcastById(req.params.id);

      // NOTE: ADD CODE TO FETCH FROM LISTEN API, STORE IN DB INSTEAD
      if (!podcastData) {
        util.setError(404, `No podcast found with that id`);
        return util.send(res);
      }

      // Create an association between podcast and user
      const savedPodcast = await PodcastService.savePodcastToUser(
        podcastData.podcastId,
        req.user.userId
      );

      if (savedPodcast) {
        util.setSuccess(200, `Saved podcast for user`, savedPodcast);
        return util.send(res);
      }

      util.setError(
        400,
        `Error saving podcast to user - couldn't find this podcast in DB`
      );
      return util.send(res);
    } catch (e) {
      console.log('Error saving podcast to user');
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
