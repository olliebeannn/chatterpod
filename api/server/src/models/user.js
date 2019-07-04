module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    googleId: {
      type: DataTypes.INTEGER
    },
    facebookId: {
      type: DataTypes.INTEGER
    }
  });
  return User;
};
