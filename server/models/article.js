export default function(sequelize, DataTypes) {
  const Article = sequelize.define('Article', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    content_html: DataTypes.TEXT,
    comments_count: DataTypes.INTEGER,
    is_publish: DataTypes.BOOLEAN,
  }, {
    tableName: 'articles',
    underscored: true,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  return Article;
};
