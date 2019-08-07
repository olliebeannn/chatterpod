import EpisodeService from '../services/EpisodeService';
import Util from '../utils/Util';

const util = new Util();

class EpisodeController {
  static async getAllEpisodes(req, res) {
    try {
      const allEpisodes = await EpisodeService.getAllEpisodes();

      if (allEpisodes.length > 0) {
        util.setSuccess(200, 'Episodes retrieved', allEpisodes);
      } else {
        util.setSuccess(200, 'No episodes in DB');
      }

      util.send(res);
    } catch (e) {
      console.log('Problem pulling all episodes from DB', e);
      util.setError(400, e);
      return util.send(res);
    }
  }
}

export default EpisodeController;
