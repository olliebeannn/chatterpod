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

  // pullEpisode(episodeId) - just pull episode without podcast data from DB
  static async pullEpisode(episodeId) {
    try {
      return await Episode.findOne({ where: { episodeId } });
    } catch (e) {
      console.log(`error getting episode with id ${episodeId}`, e);
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
  // Should this be in UserService?
  static async pullEpisodesForUser(userId) {
    try {
      return await User.find({
        where: { userId },
        include: ['episodes']
      });
    } catch (e) {
      console.log(`problem getting user podcasts for userId ${userId}`, e);
      throw e;
    }
  }

  // Fetch episode data from API
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

  // saveEpisode(episodeData) - save API-formatted episode data to DB
  static async saveEpisodeFromApi(episodeData) {
    // Version using standard find, then create if not found;
    // Verbose but better error reporting
    try {
      var episode = await EpisodeService.pullEpisode(episodeData.id);
    } catch (e) {
      console.log(
        `problem searching database for episode with id ${episodeData.id}`,
        e
      );
      throw e;
    }

    // Return episode if exists in db
    if (episode) return episode;

    try {
      return await Episode.create({
        episodeId: episodeData.id,
        title: episodeData.title,
        description: episodeData.description,
        thumbnail: episodeData.thumbnail,
        listennotesURL: episodeData.listennotes_url,
        audioURL: episodeData.audio,
        pubDate_ms: episodeData.pub_date_ms,
        length_s: episodeData.audio_length_sec,
        podcastId: episodeData.podcast.id
      });
    } catch (e) {
      console.log(`problem creating episode with id ${episodeData.id}`);
      throw e;
    }

    // findOrCreate version of function; poor error reporting
    // Episode.findOrCreate({
    //   where: {
    //     episodeId: episodeData.id
    //   },
    //   defaults: {
    //     title: episodeData.title,
    //     description: episodeData.description,
    //     thumbnail: episodeData.thumbnail,
    //     listennotesURL: episodeData.listennotes_url,
    //     audioURL: episodeData.audio,
    //     pubDate_ms: episodeData.pub_date_ms,
    //     length_s: episodeData.audio_length_sec,
    //     podcastId: episodeData.podcast.id
    //   }
    // })
    //   .then(([episode, created]) => {
    //     console.log('new episode created?', created);
    //     return episode;
    //   })
    //   .catch(e => {
    //     console.log(`problem creating episode with id ${episodeData.id}`);
    //   });
  }

  // STUB: saveEpisodeToUser(episodeId, userId)

  // STUB: removeEpisodeFromUser(episodeId, userId)
}

export default EpisodeService;
