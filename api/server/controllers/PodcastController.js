import axios from 'axios';
import _ from 'lodash';

import PodcastService from '../services/PodcastService';
import UserService from '../services/UserService';
import UserPodcastService from '../services/UserPodcastService';
import Util from '../utils/Util';

const util = new Util();

const MAX_PODCAST_DESCRIPTION_LEN = 1024;

class PodcastController {
  // RENAME pullAllPodcasts
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

  // RENAME savePodcast
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

  // CHANGING: pull from API every time, no saving - so we can get episode info
  // RENAME fetchPodcast
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
      podcast = await PodcastService.getPodcastFromApi(req.params.id);
    } catch (e) {
      console.log('Problem getting podcast data from Listen API', e);
      util.setError(400, e);
      return util.send(res);
    }

    // Check if podcast was saved for this user, if so, add userSaved = true to response
    if (req.user) {
      try {
        var userPodcast = await UserPodcastService.getUserPodcast(
          req.user.userId,
          req.params.id
        );
      } catch (e) {
        console.log('Problem getting user-podcast data from db', e);
      }

      if (userPodcast) {
        podcast.userSaved = true;
      } else {
        podcast.userSaved = false;
      }
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
        var apiPodcastData = await PodcastService.getPodcastFromApi(
          req.params.id
        );
      } catch (e) {
        console.log('Problem getting podcast data from Listen API', e);
        util.setError(400, e);
        return util.send(res);
      }

      try {
        podcast = await PodcastService.savePodcastToDb(apiPodcastData);
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

  // Removes association between podcast and logged in user
  static async removePodcastFromUser(req, res) {
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

    // Remove the podcast and return response from DB
    try {
      let dbResponse = await UserPodcastService.removeUserPodcast(
        req.user.userId,
        req.params.id
      );

      util.setSuccess(
        200,
        `Removed podcast with id ${req.params.id} from user with id ${
          req.user.userId
        }`,
        dbResponse
      );
      return util.send(res);
    } catch (e) {
      console.log('Error removing podcast from user', e);
      util.setError(400, e);
      return util.send(res);
    }
  }

  // Gets all podcasts that this user has saved
  // RENAME pullsavedPodcasts
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

      // Add field for userSaved = true to all
      let podcasts = _.cloneDeep(JSON.parse(JSON.stringify(userData.podcasts)));

      podcasts.map(podcast => {
        podcast.userSaved = true;
      });

      util.setSuccess(200, `Found user podcast data`, podcasts);
      return util.send(res);
    } catch (e) {
      util.setError(400, e);
      return util.send(res);
    }
  }

  // RENAME fetchTopPodcasts
  static async getTopPodcasts(req, res) {
    let response;

    try {
      response = await axios.get(
        'https://listen-api.listennotes.com/api/v2/best_podcasts?region=us',
        {
          headers: {
            'X-ListenAPI-Key': process.env.listenAPIKey
          }
        }
      );
    } catch (e) {
      console.log('Error with request to get top podcasts', e);
      util.setError(400, 'There was a problem getting top podcasts');
      return util.send(res);
    }

    // Transform data into same format as podcasts pulled from DB
    let topPodcasts = [];

    response.data.podcasts.map(podcast => {
      let newPodcast = _.pick(podcast, [
        'title',
        'thumbnail',
        'website',
        'description'
      ]);
      newPodcast.podcastId = podcast.id;

      // TO ADD: step to add genres to podcast
      topPodcasts.push(newPodcast);
    });

    // For these podcasts, check if they're saved to the user; add prop
    let userSavedPodcastIds = await UserPodcastService.getAllUserPodcasts(
      req.user.userId
    );
    // console.log('userSavedPodcastIds', userSavedPodcastIds);

    // Add data on if logged in user has saved or not to return value
    topPodcasts.map(podcast => {
      if (podcast.podcastId in userSavedPodcastIds) {
        podcast.userSaved = true;
      } else {
        podcast.userSaved = false;
      }
    });

    util.setSuccess(200, 'Got top podcasts', topPodcasts);
    return util.send(res);
  }
}

export default PodcastController;
