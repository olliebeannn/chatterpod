import axios from 'axios';

import database from '../src/models';
const Episode = database.episode;

class EpisodeService {
  static async getAllEpisodes() {
    try {
      return await Episode.findAll();
    } catch (e) {
      console.log('error getting all episodes', e);
      throw e;
    }
  }
}

export default EpisodeService;
