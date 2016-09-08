'use strict';
module.exports = function(sequelize, DataTypes) {
  var article = sequelize.define('article', {
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
  return article;
};
