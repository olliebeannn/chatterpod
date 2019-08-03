import database from '../src/models';
const UserPodcast = database.user_podcast;

class UserPodcastService {
  static async getUserPodcast(userId, podcastId) {
    try {
      return await UserPodcast.findOne({ userId, podcastId });
    } catch (e) {
      console.log('error getting user_podcast record', e);
      throw e;
    }
  }

  // Fetch IDs for all podcasts for this user; returns array
  static async getAllUserPodcasts(userId) {
    try {
      return await UserPodcast.findAll({
        where: { userId },
        attributes: ['podcastId'],
        raw: true
      }).map(item => item.podcastId);
    } catch (e) {
      console.log(`error getting all user_podcast records for ${userId}`, e);
      throw e;
    }
  }
}

export default UserPodcastService;
