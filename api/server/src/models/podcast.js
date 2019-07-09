'use strict';
module.exports = (sequelize, DataTypes) => {
  const Podcast = sequelize.define('Podcast', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    thumbnail: {
      type: DataTypes.STRING
    },
    website: {
      type: DataTypes.STRING
    }
  });
  Podcast.associate = function(models) {
    // associations can be defined here
    Podcast.belongsToMany(models.User, {
      through: 'user_podcast',
      as: 'user'
    });
  };
  return Podcast;
};
