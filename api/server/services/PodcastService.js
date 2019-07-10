import database from '../src/models';
const Podcast = database.podcast;

class PodcastService {
  static async getAllPodcasts() {
    try {
      return await Podcast.findAll();
    } catch (e) {
      throw e;
    }
  }

  static async findPodcastById(podcastId) {
    try {
      return await Podcast.findOne({
        where: { podcastId: podcastId }
      });
    } catch (e) {
      throw e;
    }
  }

  static async createPodcast(newPodcast) {
    try {
      //   const existingPodcast = await Podcast.findOne({
      //     where: { podcastId: newPodcast.podcastId }
      //   });
      //
      //   if (existingPodcast) {
      //     return existingPodcast;
      //   } else {
      return await Podcast.create(newPodcast);
      // }
    } catch (e) {
      throw e;
    }
  }
}

export default PodcastService;
