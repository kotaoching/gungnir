export default function(sequelize, DataTypes) {
  const Comment = sequelize.define('Comment', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    website: DataTypes.STRING,
    content: DataTypes.TEXT,
    article_id: DataTypes.INTEGER,
    parent_id: DataTypes.INTEGER,
    is_delete: DataTypes.BOOLEAN
  }, {
    tableName: 'comments',
    underscored: true,
    classMethods: {
      associate: function(models) {
      }
    }
  });

  return Comment;
};
