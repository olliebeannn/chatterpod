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

  // Doesn't check for existence of podcast before creating; use findPodcastById first
  static async createPodcast(newPodcast) {
    try {
      return await Podcast.create(newPodcast);
    } catch (e) {
      throw e;
    }
  }
}

export default PodcastService;
