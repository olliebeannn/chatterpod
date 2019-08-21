import EpisodeService from '../services/EpisodeService';
import Util from '../utils/Util';

const util = new Util();

class EpisodeController {
  static async pullAllEpisodes(req, res) {
    try {
      const allEpisodes = await EpisodeService.pullAllEpisodes();

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

  static async pullEpisodeWithPodcast(req, res) {
    try {
      const episode = await EpisodeService.pullEpisodeWithPodcast(
        req.params.id
      );

      util.setSuccess(
        200,
        `Pulled episode with id ${req.params.id} from db`,
        episode
      );
      return util.send(res);
    } catch (e) {
      console.log(`Problem pulling episode with id ${id} from DB`, e);
      util.setError(400, e);
      return util.send(res);
    }
  }

  static async fetchEpisode(req, res) {
    try {
      const episode = await EpisodeService.fetchEpisode(req.params.id);

      util.setSuccess(
        200,
        `Pulled episode with id ${req.params.id} from api`,
        episode
      );
      return util.send(res);
    } catch (e) {
      console.log(
        `Problem pulling episode with id ${id} from ListenNotes API`,
        e
      );
      util.setError(400, e);
      return util.send(res);
    }
  }

  // FAILED ATTEMPT TO TEST NEW ROUTE TO SAVE EPISODE DATA
  static async saveEpisode(req, res) {
    try {
      const episode = await EpisodeService.saveEpisode(req.body);

      util.setSuccess(
        200,
        `Saved episode with id ${req.body.id} from api`,
        episode
      );
      return util.send(res);
    } catch (e) {
      console.log(`error saving episode with id ${req.params.id}`, e);
      util.setError(400, e);
      return util.send(res);
    }
  }
}

export default EpisodeController;
