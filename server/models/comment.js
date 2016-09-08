'use strict';
module.exports = function(sequelize, DataTypes) {
  var comment = sequelize.define('comment', {
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
        // associations can be defined here
      }
    }
  });
  return comment;
};
