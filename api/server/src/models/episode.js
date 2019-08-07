// EPISODE MODEL STUB

// episodeId - primary key, string
// title - string
// description - string, 1024 char limit
// thumbnail - string, url
// listennotesURL - string, url (link to listennotes website)
// pubDate_ms - pub date in ms, integer
// length_s - length in s, integer
// audioURL - string, url (link to listennotes audio)
//
// association:
// podcastId - belongs to Podcast, foreignKey = 'podcastId'

'use strict';
module.exports = (sequelize, DataTypes) => {
  const Episode = sequelize.define(
    'episode',
    {
      episodeId: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: DataTypes.STRING(1024),
      thumbnail: DataTypes.STRING,
      listennotesURL: DataTypes.STRING,
      audioURL: DataTypes.STRING,
      pubDate_ms: DataTypes.INTEGER,
      length_s: DataTypes.INTEGER
    },
    {}
  );
  Episode.associate = function(models) {
    Episode.belongsTo(models.podcast, {
      foreignKey: 'podcastId',
      targetKey: 'podcastId'
    });
  };
  return Episode;
};
