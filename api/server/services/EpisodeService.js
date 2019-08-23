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

  // STUB: pullEpisode(episodeId) - just pull episode without podcast data
  // Use in saveEpisode if findOrCreate won't work
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

  // saveEpisode(episodeData) - save properly formatted episode data to DB
  static async saveEpisode(episodeData) {
    // findOrCreate version of function
    Episode.findOrCreate({
      where: {
        episodeId: episodeData.id
      },
      defaults: {
        title: episodeData.title,
        description: episodeData.description,
        thumbnail: episodeData.thumbnail,
        listennotesURL: episodeData.listennotes_url,
        audioURL: episodeData.audio,
        pubDate_ms: episodeData.pub_date_ms,
        length_s: episodeData.audio_length_sec
      }
    })
      .then(([episode, created]) => {
        console.log('new episode created?', created);
        return episode;
      })
      .catch(e => {
        console.log(`problem creating episode with id ${episodeData.id}`);
      });

    // Regular find version of function; better error reporting, but less efficient
    // try {
    //   var episode = await EpisodeService.pullEpisode(episodeData.id);
    // } catch (e) {
    //   console.log(
    //     `problem searching database for episode with id ${episodeData.id}`,
    //     e
    //   );
    //   throw e;
    // }
    //
    // // Return episode if exists in db
    // if (episode) return episode;
    //
    // try {
    //   return await Episode.create({
    //     episodeId: episodeData.id,
    //     title: episodeData.title,
    //     description: episodeData.description,
    //     thumbnail: episodeData.thumbnail,
    //     listennotesURL: episodeData.listennotes_url,
    //     audioURL: episodeData.audio,
    //     pubDate_ms: episodeData.pub_date_ms,
    //     length_s: episodeData.audio_length_sec
    //   });
    // } catch (e) {
    //   console.log(`problem creating episode with id ${episodeData.id}`);
    //   throw e;
    // }
  }

  // STUB: saveEpisodeToUser(episodeId, userId)

  // STUB: removeEpisodeFromUser(episodeId, userId)
}

export default EpisodeService;
