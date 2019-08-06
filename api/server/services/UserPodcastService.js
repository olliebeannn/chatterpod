import database from '../src/models';
const UserPodcast = database.user_podcast;

class UserPodcastService {
  static async getUserPodcast(userId, podcastId) {
    try {
      return await UserPodcast.findOne({ where: { userId, podcastId } });
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

  static async removeUserPodcast(userId, podcastId) {
    try {
      return await UserPodcast.destroy({ where: { userId, podcastId } });
    } catch (e) {
      console.log(
        `error removing podcast with id ${podcastId} from user with id ${userId}`
      );
      throw e;
    }
  }
}

export default UserPodcastService;
