import axios from 'axios';

import database from '../src/models';
const Episode = database.episode;
const User = database.user;

class EpisodeService {
  static async pullAllEpisodes() {
    try {
      return await Episode.findAll();
    } catch (e) {
      console.log('error pulling all episodes from db', e);
      throw e;
    }
  }

  static async pullEpisodeWithPodcast(episodeId) {
    try {
      return await Episode.findOne({
        where: {
          episodeId: episodeId
        },
        include: ['podcast']
      });
    } catch (e) {
      console.log('error getting episode with podcast data', e);
      throw e;
    }
  }

  // STUB: pullEpisodesForUser(userId) - from DB
  static async pullEpisodesForUser(userId) {
    try {
      return await User.find({
        where: { userId },
        include: ['epsiodes']
      });
    } catch (e) {
      console.log(`problem getting user podcasts for userId ${userId}`, e);
      throw e;
    }
  }

  // STUB: fetchEpisode(episodeId) - from API
  static async fetchEpisode(episodeId) {
    try {
      let response = await axios.get(
        `https://listen-api.listennotes.com/api/v2/episodes/${episodeId}`,
        {
          headers: {
            'X-ListenAPI-Key': process.env.listenAPIKey
          }
        }
      );

      if (response.status == 200) {
        return response.data;
      }
    } catch (e) {
      console.log(
        `error getting episode with id ${episodeId} from ListenNotes API`
      );
      throw e;
    }
  }

  // STUB: saveEpisode(episodeData)

  // STUB: saveEpisodeToUser(episodeId, userId)

  // STUB: removeEpisodeFromUser(episodeId, userId)
}

export default EpisodeService;
