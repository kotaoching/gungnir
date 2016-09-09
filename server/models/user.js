import bcrypt from 'bcrypt';

export default function(sequelize, DataTypes) {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password_hash: DataTypes.STRING
  }, {
    tableName: 'users',
    underscored: true,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      },
      createPasswordHash: function(password, saltRounds) {
        return bcrypt.hashSync(password, 10);
      },
      auth: async function(account, password) {
        let user;
        if (account.indexOf('@') != -1) {
          user = await this.find({
            where: {
              email: account
            }
          });
        } else {
          user = await this.find({
            where: {
              username: account
            }
          });
        }

        return bcrypt.compareSync(password, user.password_hash);
      }
    }
  });

  return User;
};
