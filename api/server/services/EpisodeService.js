import axios from 'axios';

import database from '../src/models';
const Episode = database.episode;

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

  // STUB: fetchEpisode(episodeId) - from API

  // STUB: saveEpisode(episodeData)

  // STUB: saveEpisodeToUser(episodeId, userId)

  // STUB: removeEpisodeFromUser(episodeId, userId)
}

export default EpisodeService;
