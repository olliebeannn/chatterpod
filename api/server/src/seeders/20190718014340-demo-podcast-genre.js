'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('podcast_genres', [
      {
        // id: 1,
        podcastId: 'd9604d45a8494577bec068df875fb69d',
        genreId: 125,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        // id: 2,
        podcastId: 'd9604d45a8494577bec068df875fb69d',
        genreId: 122,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        // id: 3,
        podcastId: '7f519d33692246a98688a1415c3c591c',
        genreId: 122,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        // id: 4,
        podcastId: '88b15eefe35d42c58bca9c5e17080661',
        genreId: 125,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        // id: 5,
        podcastId: 'd9604d45a8494577bec068df875fb69d',
        genreId: 107,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        // id: 6,
        podcastId: '88b15eefe35d42c58bca9c5e17080661',
        genreId: 122,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('podcast_genres', null, {});
  }
};
