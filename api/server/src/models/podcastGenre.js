module.exports = (sequelize, DataTypes) => {
  const PodcastGenre = sequelize.define('podcast_genre', {
    podcastId: {
      allowNull: false,
      type: DataTypes.STRING
    },
    genreId: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  });

  return PodcastGenre;
};
