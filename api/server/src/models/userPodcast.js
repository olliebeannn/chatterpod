module.exports = (sequelize, DataTypes) => {
  const UserPodcast = sequelize.define('user_podcast', {
    UserId: DataTypes.INTEGER,
    PodcastId: DataTypes.STRING
  });

  return UserPodcast;
};
