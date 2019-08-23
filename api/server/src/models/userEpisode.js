module.exports = (sequelize, DataTypes) => {
  const UserEpisode = sequelize.define('user_episode', {
    userId: DataTypes.INTEGER,
    episodeId: DataTypes.STRING
  });

  return UserEpisode;
};
