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
    return queryInterface.bulkInsert('episodes', [
      {
        episodeId: '02f0123246c944e289ee2bb90804e41b',
        title: '1,775: Happy 75th Birthday, George Lucas!',
        description:
          "<p>On the momentous occasion of George Lucas' 75th birthday, an extended episode in which I'm charting his involvement in the Star Wars franchise after the sale of Lucasfilm to Disney. Turns out, it isn't just that he can't leave it behind - it's that he's trying to guide the next generation of filmmakers in their efforts to tell new stories in the galaxy far, far away. Punch it!</p> <p>***I'm listener supported! Join the community at http://Patreon.com/sw7x7 to get access to bonus episodes and other insider rewards.*** </p>",
        thumbnail:
          'https://cdn-images-1.listennotes.com/podcasts/star-wars-7x7-star-wars-news-interviews-and-AIg3cZVKCsL.300x300.jpg',
        listennotesURL:
          'https://www.listennotes.com/e/02f0123246c944e289ee2bb90804e41b/',
        audioURL:
          'https://www.listennotes.com/e/p/02f0123246c944e289ee2bb90804e41b/',
        pubDate_ms: 1557817200000,
        length_s: 865,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        podcastId: '4d3fe717742d4963a85562e9f84d8c79'
      },
      {
        episodeId: '022ccb4997ac4c6db44631a8e29fbe29',
        title: 'Ever Dearest Cousin Nicky',
        description:
          'King George V and Tsar Nicholas II were first cousins wh…e under threat, the other had a decision to make.&nbsp;',
        thumbnail:
          'https://cdn-images-1.listennotes.com/podcasts/noble-blood-iheartradio-aaron-mahnke-r40tnRmJi7h-bAQak1jR0OK.300x300.jpg',
        listennotesURL:
          'https://www.listennotes.com/e/022ccb4997ac4c6db44631a8e29fbe29/',
        audioURL:
          'https://www.listennotes.com/e/p/022ccb4997ac4c6db44631a8e29fbe29/',
        pubDate_ms: 1566284460000,
        length_s: 1664,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        podcastId: '88b15eefe35d42c58bca9c5e17080661'
      },
      {
        episodeId: 'b61c9f99c0b44648a958806d028a165e',
        title: 'The Butcher Baronet',
        description:
          'An Australian man comes to England claiming to be a long…ory—and a scandal that captivated the Victorian public.',
        thumbnail:
          'https://cdn-images-1.listennotes.com/podcasts/noble-blood-iheartradio-aaron-mahnke-r40tnRmJi7h-bAQak1jR0OK.300x300.jpg',
        listennotesURL:
          'https://www.listennotes.com/e/b61c9f99c0b44648a958806d028a165e/',
        audioURL:
          'https://www.listennotes.com/e/p/b61c9f99c0b44648a958806d028a165e/',
        pubDate_ms: 1565074860000,
        length_s: 1825,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        podcastId: '88b15eefe35d42c58bca9c5e17080661'
      },
      {
        episodeId: '3f8541d10af64f87b978afb99225cb03',
        title: 'Magnificent Desolation | Part 4',
        description:
          'Nearly every single human with access to a TV set watched the blurry, almost surreal image of Neil Armstrong stepping live onto the surface of the moon. But after Apollo 11 returned to earth, we got an entirely different view of those first historic moments. Join us for the journey of Apollo 11, the seven Apollo Missions that followed, and decades of disappointments and shortfalls, crowned at last with a new hope for our future in space.',
        thumbnail:
          'https://cdn-images-1.listennotes.com/podcasts/apollo-11-what-we/magnificent-desolation-part-4-5Gk0setb8q2-io9gkEJHclR.300x300.jpg',
        listennotesURL:
          'https://www.listennotes.com/e/3f8541d10af64f87b978afb99225cb03/',
        audioURL:
          'hhttps://www.listennotes.com/e/p/3f8541d10af64f87b978afb99225cb03/',
        pubDate_ms: 1563627600000,
        length_s: 5821,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        podcastId: 'd9604d45a8494577bec068df875fb69d'
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
    return queryInterface.bulkDelete('episodes', null, {});
  }
};
