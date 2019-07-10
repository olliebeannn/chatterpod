module.exports = (sequelize, DataTypes) => {
  const UserPodcast = sequelize.define('user_podcast', {
    userId: DataTypes.INTEGER,
    podcastId: DataTypes.STRING
  });

  return UserPodcast;
};
