'use strict';
module.exports = (sequelize, DataTypes) => {
  const Podcast = sequelize.define('podcast', {
    podcastId: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    thumbnail: DataTypes.STRING,
    website: DataTypes.STRING
  });
  Podcast.associate = function(models) {
    // associations can be defined here
    Podcast.belongsToMany(models.user, {
      through: 'user_podcast',
      foreignKey: 'podcastId'
    });

    Podcast.belongsToMany(models.genre, {
      through: 'podcast_genre',
      foreignKey: 'podcastId'
    });
  };
  return Podcast;
};
