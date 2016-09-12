import * as models from '../models';

const Comment = models.Comment;

export async function list(ctx, next) {
  const slug = ctx.params.slug;
  const article = await Article.findOne({
    attributes: ['id'],
    where: {
      slug: slug
    }
  });
  const comments = await Comment.findAll({
    where: {
      article_id: article.id,
      is_delete: false
    },
    order: [
      ['created_at', 'ASC']
    ]
  });

  ctx.body = {
    data: comments
  };
}

export async function create(ctx, next) {
  const content = ctx.request.body.content;
  const comment = await Comment.create({
    content: content
  })
  .catch(function(err) {
    console.log(err);
  });
}

export async function update(ctx, next) {
  const content = ctx.request.body.content;

  const comment = await Comment.update({
    content: content
  })
  .catch(function(err) {
    console.log(err);
  });
}
