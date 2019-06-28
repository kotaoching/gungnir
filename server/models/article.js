import pinyin from 'pinyin';

export default function(sequelize, DataTypes) {
  const Article = sequelize.define(
    'Article',
    {
      title: DataTypes.STRING,
      slug: DataTypes.STRING,
      content: DataTypes.TEXT,
      content_html: DataTypes.TEXT,
      user_id: DataTypes.INTEGER,
      comments_count: DataTypes.INTEGER,
      is_publish: DataTypes.BOOLEAN
    },
    {
      tableName: 'articles',
      underscored: true
    }
  );

  Article.associate = function(models) {
    Article.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'author'
    });
  };

  Article.createSlug = async function(title) {
    const slug = pinyin(title, {
      style: pinyin.STYLE_NORMAL
    }).join('-');

    return await this.validateSlug(slug, slug);
  };

  Article.validateSlug = async function(slug, newSlug) {
    var validSlug = newSlug;
    const articlesLength = await this.count({
      where: {
        slug: validSlug
      }
    });

    if (articlesLength !== 0) {
      const postfix = parseInt(validSlug.replace(slug + '-', '')) || 0;
      validSlug = slug + '-' + (postfix + articlesLength);

      return await this.validateSlug(slug, validSlug);
    } else {
      return validSlug;
    }
  };

  return Article;
}
