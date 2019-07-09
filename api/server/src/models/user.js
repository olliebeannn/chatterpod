module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    photo: {
      type: DataTypes.STRING
    }
  });
  User.associate = function(models) {
    // associations can be defined here
    User.belongsToMany(models.Podcast, {
      through: 'user_podcast',
      as: 'podcast'
    });
  };
  return User;
};
