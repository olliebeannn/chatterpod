import database from '../src/models';

class PodcastService {
  static async getAllPodcasts() {
    try {
      return await database.Podcast.findAll();
    } catch (e) {
      throw e;
    }
  }

  static async createPodcast(newPodcast) {
    try {
      const existingPodcast = await database.Podcast.findOne({
        where: { id: newPodcast.id }
      });

      if (existingPodcast) {
        return existingPodcast;
      } else {
        return await database.Podcast.create(newPodcast);
      }
    } catch (e) {
      throw e;
    }
  }
}

export default PodcastService;
