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
    return queryInterface.bulkInsert(
      'podcasts',
      [
        {
          podcastId: 'd9604d45a8494577bec068df875fb69d',
          title: 'Apollo 11: What We Saw',
          description:
            'On July 20, 1969, Neil Armstrong and Buzz Aldrin became …like to the millions of Americans who lived through it.',
          thumbnail:
            'https://cdn-images-1.listennotes.com/podcasts/apollo-11-…teric-radio-theatre-jExq540cbZQ-ZDO7CGV0_Jw.300x300.jpg',
          website:
            'https://www.dailywire.com/?utm_source=listennotes.com&utm_campaign=Listen+Notes&utm_medium=website',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          podcastId: '7f519d33692246a98688a1415c3c591c',
          title: 'Larger Than Life',
          description:
            '\n      <p>In 1960s Los Angeles, after the catastrophic …he L.A. Times. Photo Illustration by Wondery.</p>\n',
          thumbnail:
            'https://cdn-images-1.listennotes.com/podcasts/larger-than-life-EyD5lXv4Nz1-S7lxcsdzom3.300x300.jpg',
          website:
            'https://art19.com/shows/larger-than-life?utm_source=listennotes.com&utm_campaign=Listen+Notes&utm_medium=website',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          podcastId: '88b15eefe35d42c58bca9c5e17080661',
          title: 'Noble Blood',
          description:
            'Author Dana Schwartz explores the stories of some of his…when you’re wearing a crown, mistakes often mean blood.',
          thumbnail:
            'https://cdn-images-1.listennotes.com/podcasts/noble-blood-iheartradio-oi2LjrdD_vE-bAQak1jR0OK.300x300.jpg',
          website:
            'http://noblebloodtales.com?utm_source=listennotes.com&utm_campaign=Listen+Notes&utm_medium=website',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('podcasts', null, {});
  }
};
