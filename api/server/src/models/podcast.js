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
    description: {
      type: DataTypes.STRING(1024),
      set(val) {
        this.setDataValue('description', val.substring(0, 1023));
      }
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
