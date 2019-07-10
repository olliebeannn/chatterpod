module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    userId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    photo: DataTypes.STRING
  });
  User.associate = function(models) {
    // associations can be defined here
    User.belongsToMany(models.podcast, {
      through: 'user_podcast',
      foreignKey: 'userId'
    });
  };
  return User;
};
