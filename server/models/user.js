import bcrypt from 'bcrypt';

export default function(sequelize, DataTypes) {
  const User = sequelize.define(
    'User',
    {
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password_hash: DataTypes.STRING
    },
    {
      tableName: 'users',
      underscored: true,
      classMethods: {}
    }
  );

  User.associate = function(models) {
    User.hasMany(models.Article);
  };

  User.createPasswordHash = function(password, saltRounds) {
    return bcrypt.hashSync(password, 10);
  };

  User.checkPassword = async function(password, password_hash) {
    return bcrypt.compareSync(password, password_hash);
  };

  return User;
}
