'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('podcast_genres', {
      // id: {
      //   allowNull: false,
      //   autoIncrement: true,
      //   primaryKey: true,
      //   type: Sequelize.INTEGER
      // },
      podcastId: {
        type: Sequelize.STRING,
        references: {
          model: 'podcasts',
          key: 'podcastId'
        }
      },
      genreId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'genres',
          key: 'genreId'
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
    return queryInterface.dropTable('podcast_genres');
  }
};
