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
}

export default UserPodcastService;
