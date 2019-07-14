'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('genres', {
      genreId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      genreName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      genreParentId: {
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable('genres');
  }
};
