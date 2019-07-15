'use strict';
module.exports = (sequelize, DataTypes) => {
  const Genre = sequelize.define('genre', {
    genreId: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    genreName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    parentGenreId: {
      type: DataTypes.INTEGER
    }
  });
  // Genre.associate = function(models) {
  //   // associations can be defined here
  // };
  return Genre;
};
