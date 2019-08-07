'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('episodes', {
      episodeId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: Sequelize.STRING(1024),
      thumbnail: Sequelize.STRING,
      listennotesURL: Sequelize.STRING,
      audioURL: Sequelize.STRING,
      pubDate_ms: Sequelize.INTEGER,
      length_s: Sequelize.INTEGER,
      podcastId: {
        type: Sequelize.STRING,
        references: {
          model: 'podcasts',
          key: 'podcastId'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('episodes');
  }
};
