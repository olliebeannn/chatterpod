'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'users',
      [
        {
          name: 'Ollie Khakwani',
          email: 'okhakwani@gmail.com',
          userId: 1,
          photo:
            'https://lh3.googleusercontent.com/-s_tv3HuijqM/AAAAAAAAAAI/AAAAAAAAAm4/ijoTwqWwWRQ/photo.jpg',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          name: 'Ollie Khakwani',
          email: 'ollie@donut.ai',
          userId: 2,
          photo:
            'https://lh5.googleusercontent.com/-7p5UPDNOFCA/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rcim1x2IuGqYZBTOPp3U84Pnlh9yQ/photo.jpg',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
